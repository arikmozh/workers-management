/* eslint-disable @typescript-eslint/no-explicit-any */
import NavbarBlank from "@/components/Navbar-blank";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/interface";
import { Icons } from "../components/ui/icons";
import React, { useState } from "react";
import CryptoJS from "crypto-js";
import { register, login } from "../utils/authUtils";

const RegisterPassword = () => {
  const store = useSelector((state: RootState) => state);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordValidation1, setPasswordValidation1] = useState(true);
  const [passwordValidation2, setPasswordValidation2] = useState(true);
  const [requestValidate, setRequestValidate] = useState(true);

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

  const handlePasswordEncryption = () => {
    const secretKey = "Workers"; // Replace with your secret key

    // // Encrypt the password using AES encryption
    // // return CryptoJS.AES.encrypt(password, secretKey).toString();
    // const fixedIV = CryptoJS.enc.Utf8.parse("ThisIsA16ByteIV");

    // // Encrypt the password using AES encryption
    // // return CryptoJS.AES.encrypt(password, secretKey).toString();
    // const encrypted = CryptoJS.AES.encrypt(password, secretKey, {
    //   iv: fixedIV,
    // }).toString();

    // return encrypted;
    // Now you can send `encryptedPassword` to the server.
    // Implement the server-side decryption and password hashing as described in previous responses.
    const derivedKey = CryptoJS.EvpKDF(secretKey, secretKey, {
      keySize: 128 / 32, // AES key size (128 bits)
      iterations: 1, // Increase the number of iterations for stronger key derivation
    });

    const encrypted = CryptoJS.AES.encrypt(password, derivedKey, {
      mode: CryptoJS.mode.ECB, // Electronic Codebook mode (ECB)
      padding: CryptoJS.pad.Pkcs7, // PKCS#7 padding
    }).toString();

    return encrypted;
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    // Validate password (mandatory)
    if (password === "") {
      setPasswordValidation1(false);
      setIsLoading(false);

      // Display a validation message or perform necessary action
      return;
    }

    // Validate password verification (mandatory)
    if (verifyPassword === "") {
      setIsLoading(false);
      setPasswordValidation2(false);
      // Display a validation message or perform necessary action
      return;
    }

    // Check if passwords match
    if (password !== verifyPassword) {
      setPasswordValidation1(true);
      setPasswordValidation2(true);

      setPasswordMatch(false);
      setIsLoading(false);
      // Display a validation message or perform necessary action
      return;
    }

    // Continue with the registration process
    // ...
    setPasswordValidation1(true);
    setPasswordValidation2(true);
    setPasswordMatch(true);
    const pass = handlePasswordEncryption();
    const obj = {
      fullName: store.register.fullName,
      email: store.register.email,
      phone: store.register.phone,
      password: pass,
    };

    register(obj)
      .then((result: any) => {
        // Handle the result here
        console.log(result);
        setTimeout(() => {
          login({ email: store.register.email, password: pass })
            .then((res: any) => {
              const token: string = res.token;
              sessionStorage.setItem(
                "Workers",
                JSON.stringify({
                  token: token,
                  email: store.register.email,
                  id: res.id,
                })
              );
              navigate("/dashboard");
            })
            .catch((error: any) => {
              console.log(error);
            });
          setIsLoading(false);
        }, 1000);
      })
      .catch((error: any) => {
        // Handle any errors

        console.log(error);
        setRequestValidate(false);
      });
  };

  return (
    <>
      <NavbarBlank />
      <div className="text-left pt-6 max-w-4xl m-auto">
        <Button
          className="absolute text-lg opacity-70 hover:no-underline  hover:opacity-100"
          variant={"link"}
          onClick={() => navigate("/register")}
        >
          <CaretLeftIcon />
          Back
        </Button>
      </div>

      <div className="py-20 max-w-3xl m-auto">
        <div className="grid grid-cols-2">
          <div className="text-left max-w-xs space-y-6">
            <h1 className="text-3xl font-medium">Just one more step!</h1>
            <h1 className="text-lg font-medium">
              {maskEmail(store.register.email)}
            </h1>
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {!passwordValidation1 ? (
                <div>
                  <p className="font-small text-red-400">
                    Please enter your password
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
            <div>
              <Label>Verify Password</Label>
              <Input
                type="password"
                value={verifyPassword}
                onChange={(e) => {
                  setVerifyPassword(e.target.value);
                }}
              />
              {!passwordValidation2 ? (
                <div>
                  <p className="font-small text-red-400">
                    Please verify your password
                  </p>
                </div>
              ) : (
                ""
              )}
              {!passwordMatch ? (
                <div>
                  <p className="font-small text-red-400">
                    Passwords do not match. Please verify your password
                  </p>
                </div>
              ) : (
                ""
              )}
              {!requestValidate ? (
                <div>
                  <p className="font-small text-red-400">
                    Something went wrong, try again please
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
            <Button className="w-full" onClick={handleSubmit}>
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                ""
              )}
              Register
            </Button>

            <p className="w-60 violet font-medium">Forgot password?</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPassword;
