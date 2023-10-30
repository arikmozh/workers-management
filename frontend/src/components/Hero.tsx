import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Hero = () => {
  return (
    <>
      <div className="container items-center py-20 grid grid-cols-2 max-md:grid-cols-1">
        <div className="space-y-8 z-10">
          <h1 className="md:text-7xl leading-none text-left text-4xl">
            <span className="violet md:text-9xl text-6xl">Streamline</span>{" "}
            <br />
            Your Workers Operations
          </h1>
          <p className="text-left">
            Efficiently manage production, inventory, and workforce with our
            Factory Management Software.
          </p>
          <div className="max-w-xl flex gap-8 flex-wrap">
            <Input className="max-w-xs h-16" placeholder="Email/Phone number" />
            <Button className="h-16">Get Started</Button>
          </div>
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
