import React from "react";
import { CubeIcon } from "@heroicons/react/24/outline";
import { ModeToggle } from "./ui/mode-toggle";
import { useNavigate } from "react-router-dom";

const NavbarBlank = () => {
  const navigate = useNavigate();
  return (
    <div className="container flex items-center">
      <div
        className="flex space-x-4 mr-8 flex-1 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <CubeIcon className="h-6 w-6 violet" />
        <h3>Factory management</h3>
      </div>
      <ModeToggle />
    </div>
  );
};

export default NavbarBlank;
