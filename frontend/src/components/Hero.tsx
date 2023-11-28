import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
// import { doAddRegisterPage1 } from "../redux/actions";
import { motion } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true); // Track email validation

  const handleNavigate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    if (!isValid) {
      setIsEmailValid(false);
      setTimeout(() => {
        setIsEmailValid(true);
      }, 2500);
      return;
    }
    setIsEmailValid(true);
    navigate("/register");
  };

  const animationVariants = {
    hidden: {
      opacity: 0,
      x: "-100%", // Start from the left side
    },
    visible: {
      opacity: 1,
      x: 0, // Move to the center
      transition: {
        type: "spring",
        damping: 40,
        stiffness: 120,
        duration: 5, // Increase the duration to make it slower (in seconds)
        delay: 2, // Delay before the animation starts (in seconds)
      },
    },
  };
  const animationVariants2 = {
    hidden: {
      opacity: 0,
      x: "100%", // Start from the right side
    },
    visible: {
      opacity: 1,
      x: 0, // Move to the center
      transition: {
        type: "spring",
        damping: 40,
        stiffness: 120,
        duration: 5, // Increase the duration to make it slower (in seconds)
        delay: 2.5, // Delay before the animation starts (in seconds)
      },
    },
  };

  return (
    <>
      <div className="container items-center py-20 grid grid-cols-2 max-md:grid-cols-1 ">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={animationVariants}
          className="-z-10"
        >
          <div className="space-y-8 ">
            <h1 className="md:text-7xl leading-none text-left text-4xl">
              <span className="violet md:text-9xl text-6xl ">Streamline</span>{" "}
              <br />
              Your Workers Operations
            </h1>
            <p className="text-left">
              Efficiently manage production, inventory, and workforce with our
              Factory Management Software.
            </p>
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
            {!isEmailValid && (
              <p className="text-red-500 text-left">
                Please enter a valid email address.
              </p>
            )}
          </div>
        </motion.div>

        {/* <div className="space-y-8 z-10">
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
          {!isEmailValid && (
            <p className="text-red-500 text-left">
              Please enter a valid email address.
            </p>
          )}
        </div> */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={animationVariants2}
        >
          <div className="max-md:hidden justify-end flex">
            <img
              // src="src/assets/astro.gif"
              src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDdmMzRibHF2cmZyOHE3ZmtsNXh2dm9iM3V3MW0wajVkaG9yM2YwbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/PNCDj3LkGY0QYKY2ZK/giphy.gif"
              alt=""
              className="scale-x-[-1] hover:scale-x-[-1] w-96 h-96 hover:scale-110 hover:opacity-80 transition-transform duration-500 transition-opacity duration-500 cursor-pointer animate-smoothLoop right-36 z-0 "
            />
          </div>
        </motion.div>
      </div>
      {/* <div className="flex h-full">
        <img src="src/assets/rocket.gif" alt="" className="w-64 h-64" />
      </div> */}
    </>
  );
};

export default Hero;
