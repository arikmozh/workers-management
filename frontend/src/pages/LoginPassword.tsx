/* eslint-disable @typescript-eslint/no-explicit-any */
import NavbarBlank from "@/components/Navbar-blank";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/interface";
import React, { useEffect, useState } from "react";
import { login } from "../utils/authUtils";
import { Icons } from "../components/ui/icons";
import CryptoJS from "crypto-js";

const LoginPassword = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // async function onSubmit(event: React.SyntheticEvent) {
  //   event.preventDefault();
  //   setIsLoading(true);

  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000);
  // }
  const store = useSelector((state: RootState) => state);
  const [passwordValidation1, setPasswordValidation1] = useState(true);
  const [password, setPassword] = useState("");

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

  const handlePasswordEncryption = () => {
    const secretKey = "Workers"; // Replace with your secret key
    // const fixedIV = CryptoJS.enc.Utf8.parse("ThisIsA16ByteIV");

    // // Encrypt the password using AES encryption
    // // return CryptoJS.AES.encrypt(password, secretKey).toString();
    // const encrypted = CryptoJS.AES.encrypt(password, secretKey, {
    //   iv: fixedIV,
    // }).toString();

    // return encrypted;
    const derivedKey = CryptoJS.EvpKDF(secretKey, secretKey, {
      keySize: 128 / 32, // AES key size (128 bits)
      iterations: 1, // Increase the number of iterations for stronger key derivation
    });

    const encrypted = CryptoJS.AES.encrypt(password, derivedKey, {
      mode: CryptoJS.mode.ECB, // Electronic Codebook mode (ECB)
      padding: CryptoJS.pad.Pkcs7, // PKCS#7 padding
    }).toString();

    return encrypted;

    // Now you can send `encryptedPassword` to the server.
    // Implement the server-side decryption and password hashing as described in previous responses.
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setIsLoading(true);

    // Validate password (mandatory)
    if (password === "") {
      setPasswordValidation1(false);
      setIsLoading(false);

      // Display a validation message or perform necessary action
      return;
    }

    setPasswordValidation1(true);
    const pass = handlePasswordEncryption();
    console.log(pass);
    // const obj = {
    //   email: store.login.email,
    //   password: pass,
    // };
    setTimeout(() => {
      login({ email: store.login.email, password: pass })
        .then((res: any) => {
          console.log(res);
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
      <form onSubmit={handleSubmit}>
        <div className="py-20 max-w-3xl m-auto">
          <div className="grid grid-cols-2">
            <div className="text-left max-w-xs space-y-6">
              <h1 className="text-3xl font-medium">Welcome back!</h1>
              <h1 className="text-lg font-medium">
                {maskEmail(store.login.email)}
              </h1>
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />{" "}
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
              <Button className="w-full" type="submit">
                {isLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  ""
                )}
                Login
              </Button>

              <p className="w-60 violet font-medium">Forgot password?</p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginPassword;
