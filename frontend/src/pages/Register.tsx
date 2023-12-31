import NavbarBlank from "@/components/Navbar-blank";
import React, { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { Icons } from "../components/ui/icons";
import { useDispatch } from "react-redux";
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { doAddRegisterPage1 } from "../redux/actions";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/interface";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state: RootState) => state);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [username, setUsername] = useState({
    fullName: store.register.fullName,
    email: store.register.email,
    phone: store.register.phone,
  });

  const [validate, setValidate] = useState({
    fullName: true,
    email: true,
  });

  const usual = {
    fullName: true,
    email: true,
  };

  const fullNameIsValid = (fullName: string) => {
    // A simple validation for a full name (assuming it consists of at least two words)
    const namePattern = /^[A-Za-z]+\s[A-Za-z]+/;
    return namePattern.test(fullName);
  };

  const emailIsValid = (email: string) => {
    // A simple email validation regex pattern
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailPattern.test(email);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    let updatedValidate = { ...validate };

    // Validate full name (mandatory)
    if (username.fullName === "") {
      updatedValidate = { ...updatedValidate, fullName: false };
    } else if (!fullNameIsValid(username.fullName)) {
      updatedValidate = { ...updatedValidate, fullName: false };
    }

    // Validate email (mandatory)
    if (username.email === "") {
      updatedValidate = { ...updatedValidate, email: false };
    } else if (!emailIsValid(username.email)) {
      updatedValidate = { ...updatedValidate, email: false };
    }

    // Validate phone (optional)
    // if (username.phone !== "" && /* add phone validation logic here */) {
    //   // You can add phone validation logic if needed
    //   // If invalid, update updatedValidate as needed
    // }

    setValidate(updatedValidate);

    if (!updatedValidate.fullName || !updatedValidate.email) {
      setTimeout(() => {
        setValidate(usual);
      }, 3500);
      setIsLoading(false);
    } else {
      setValidate(usual);
      setTimeout(() => {
        dispatch(doAddRegisterPage1(username));
        navigate("/register-password");
      }, 1000);
    }
  };
  // const { emaill } = useParams();

  // useEffect(() => {
  //   if (emaill) {
  //     // Do something with the email
  //     setUsername((prev) => ({ ...prev, email: emaill }));
  //   }
  // }, []);

  return (
    <>
      <NavbarBlank />
      <div className="violetBG  left-0 absolute flex items-center ">
        <p className="text-center w-full text-sm flex justify-center items-center gap-2">
          URL <LockClosedIcon className="w-4 h-4 violet" /> verification:
          https://accounts.workers.com
        </p>
      </div>

      <div className="py-20 max-w-3xl m-auto">
        <div className="grid grid-cols-2">
          <div className="text-left max-w-xs space-y-6">
            <h1 className="text-3xl font-medium">Sign Up</h1>
            <div>
              <Label>Full Name</Label>
              <Input
                type="text"
                placeholder="Jhon Smith"
                value={username.fullName}
                onChange={(e) =>
                  setUsername({ ...username, fullName: e.target.value })
                }
              />
              {!validate.fullName ? (
                <div>
                  <p className="font-small text-red-400">
                    please enter your full name
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="email@test.com"
                value={username.email}
                onChange={(e) =>
                  setUsername({ ...username, email: e.target.value })
                }
              />
              {!validate.email ? (
                <div>
                  <p className="font-small text-red-400">
                    please enter your email
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                type="text"
                placeholder="+972544123456"
                value={username.phone}
                onChange={(e) =>
                  setUsername({ ...username, phone: e.target.value })
                }
              />
              {/* {!validate.phone ? (
                <div>
                  <p className="font-small text-red-400">
                    please enter a valid phone
                  </p>
                </div>
              ) : (
                ""
              )} */}
            </div>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                ""
              )}
              Next
            </Button>
            <div className="flex justify-between text-sm">
              <Separator className="my-3 w-14" />
              OR CONTINUE WITH
              <Separator className="my-3 w-14" />
            </div>
            <Button className="w-full" variant={"secondary"}>
              <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                <path
                  fill="currentColor"
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                />
              </svg>
              Continue with Google
            </Button>
            <Button className="w-full" variant={"secondary"}>
              <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                <path
                  d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                  fill="currentColor"
                />
              </svg>
              Continue with Apple
            </Button>
            <p className="w-60 font-medium">
              <span>Already have an account? </span>
              <span
                className="violet hover:cursor-pointer"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Log In
              </span>
            </p>
          </div>

          {/* <div className="flex flex-col items-center justify-end space-y-6">
            <div className="relative">
              <img
                src="src/assets/qr.png"
                alt=""
                className="block max-w-full h-auto opacity-50"
              />
              <Button
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
                variant={"secondary"}
              >
                Get QR code
              </Button>
            </div>
            <span>Log in with QR code</span>
            <p className="w-60">
              Scan this code with the{" "}
              <span className="violet font-medium">Factory mobile app </span> to
              log in instantly.
            </p>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Register;
