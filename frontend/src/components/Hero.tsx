import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
// import { doAddRegisterPage1 } from "../redux/actions";

const Hero = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true); // Track email validation
  const [username, setUsername] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const handleNavigate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    if (!isValid) {
      // Set the state to indicate an error
      setIsEmailValid(false);
      setTimeout(() => {
        setIsEmailValid(true);
      }, 2500);
      return;
    }
    console.log(username);
    setUsername((prev) => ({ ...prev, email: email }));
    setIsEmailValid(true);
    // setTimeout(() => {
    //   dispatch(doAddRegisterPage1(username));
    navigate("/register");
    // }, 1000);

    // If email is valid, navigate to the "/register" route
    // navigate("/register");
  };
  return (
    <>
      <div className="container items-center py-20 grid grid-cols-2 max-md:grid-cols-1">
        <div className="space-y-8 z-10">
          <h1 className="md:text-7xl leading-none text-left text-4xl">
            <span className="violet md:text-9xl text-6xl -z-10">
              Streamline
            </span>{" "}
            <br />
            Your Workers Operations
          </h1>
          <p className="text-left">
            Efficiently manage production, inventory, and workforce with our
            Factory Management Software.
          </p>
          {/* <div className="max-w-xl flex gap-8 flex-wrap"> */}
          <form
            onSubmit={(e) => handleNavigate(e)}
            className="max-w-xl flex gap-8 flex-wrap"
          >
            <Input
              type="email"
              className={`max-w-xs h-16 ${!isEmailValid && "border-red-500"}`}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button className="h-16" type="submit">
              Get Started
            </Button>
          </form>
          {/* </div> */}
          {!isEmailValid && (
            <p className="text-red-500 text-left">
              Please enter a valid email address.
            </p>
          )}
        </div>
        <div className="max-md:hidden justify-end flex">
          <img
            src="src/assets/astro.gif"
            alt=""
            className="scale-x-[-1] hover:scale-x-[-1] w-96 h-96 hover:scale-110 hover:opacity-80 transition-transform duration-500 transition-opacity duration-500 cursor-pointer animate-smoothLoop right-36 z-0 "
          />
        </div>
      </div>
      {/* <div className="flex h-full">
        <img src="src/assets/rocket.gif" alt="" className="w-64 h-64" />
      </div> */}
    </>
  );
};

export default Hero;
