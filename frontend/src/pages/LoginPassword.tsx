import NavbarBlank from "@/components/Navbar-blank";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/interface";
import { useEffect } from "react";

const LoginPassword = () => {
  // const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // async function onSubmit(event: React.SyntheticEvent) {
  //   event.preventDefault();
  //   setIsLoading(true);

  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000);
  // }
  const store = useSelector((state: RootState) => state);

  const navigate = useNavigate();
  const maskEmail = (email: string) => {
    if (typeof email !== "string") {
      return email; // Return the input if it's not a string
    }

    const parts = email.split("@");
    if (parts.length !== 2) {
      return email; // Return the input if it doesn't have exactly one '@'
    }

    const username = parts[0];
    const maskedUsername = username[0] + "*".repeat(username.length - 1);
    const domain = parts[1];

    return `${maskedUsername}@${domain}`;
  };
  useEffect(() => {
    console.log(store.login);
  }, []);
  return (
    <>
      <NavbarBlank />
      <div className="text-left pt-6 max-w-4xl m-auto">
        <Button
          className="absolute text-lg opacity-70 hover:no-underline  hover:opacity-100"
          variant={"link"}
          onClick={() => navigate("/login")}
        >
          <CaretLeftIcon />
          Back
        </Button>
      </div>

      <div className="py-20 max-w-3xl m-auto">
        <div className="grid grid-cols-2">
          <div className="text-left max-w-xs space-y-6">
            <h1 className="text-3xl font-medium">Welcome back!</h1>
            <h1 className="text-lg font-medium">
              {maskEmail(store.login.email)}
            </h1>
            <div>
              <Label>Password</Label>
              <Input type="password" />
            </div>
            <Button className="w-full">Next</Button>

            <p className="w-60 violet font-medium">Forgot password?</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPassword;
