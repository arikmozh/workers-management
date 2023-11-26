import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";
import { cn } from "@/lib/utils";
import * as React from "react";
import { CubeIcon } from "@heroicons/react/24/outline";
import { GiftIcon } from "@heroicons/react/24/outline";
// import { Bars3Icon } from "@heroicons/react/24/outline";
// import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
// import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function Navbar() {
  const scrollToSection = (sectionId: string) => {
    const targetSection = document.getElementById(sectionId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const animationVariants = {
    hidden: {
      opacity: 0,
      y: "-100%", // Start from the left side
    },
    visible: {
      opacity: 1,
      y: 0, // Move to the center
      transition: {
        type: "spring",
        damping: 40,
        stiffness: 120,
        duration: 5, // Increase the duration to make it slower (in seconds)
        delay: 1.5, // Delay before the animation starts (in seconds)
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={animationVariants}
      // transition={{ duration: 5 }}
    >
      <div className="container flex items-center ">
        <div className="flex space-x-4 mr-8 max-lg:flex-1">
          <CubeIcon className="h-6 w-6 violet" />
          <h3>Workers management</h3>
        </div>
        <div className="hidden lg:flex flex-1 space-x-4 ">
          <NavigationMenu className="z-20">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="violetHover">
                  About
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] ">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md cursor-pointer"
                          onClick={() => scrollToSection("FeaturesSection")}
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            A better workflow
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Maiores impedit.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem
                      className="cursor-pointer"
                      onClick={() => scrollToSection("Stats")}
                      title="Stats"
                    >
                      Lorem ipsum, dolor sit amet consectetur adipisicing.
                    </ListItem>
                    <ListItem
                      className="cursor-pointer"
                      onClick={() => scrollToSection("Pricing")}
                      title="Pricing"
                    >
                      Lorem ipsum, dolor sit amet consectetur adipisicing.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Button
            variant="ghost"
            className="violetHover"
            onClick={() => scrollToSection("Contact")}
          >
            Contact us
          </Button>
        </div>
        <div className=" space-x-4 hidden md:flex">
          <Link to="login">
            <Button variant="ghost" className="violetHover">
              Log In
            </Button>
          </Link>
          <Link to="register">
            <Button variant="default" className="gap-2 ">
              <GiftIcon className="h-5 w-5" />
              Register
            </Button>
          </Link>
          <ModeToggle />
          <div className="hidden max-lg:flex">
            <MobileNav />
          </div>
        </div>
        <div className="hidden max-md:flex space-x-4">
          <Button variant="default" className="gap-2 max-sm:hidden">
            <GiftIcon className=" h-5 w-5 " />
            Register
          </Button>
          <MobileNav />
        </div>
      </div>
    </motion.nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:text-violet-600",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none ">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const MobileNav: React.FC = () => {
  const navigate = useNavigate();
  const scrollToSection = (sectionId: string) => {
    const targetSection = document.getElementById(sectionId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <HamburgerMenuIcon className="h-5 w-5 text-violet-600" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="flex space-x-4 mr-8 max-lg:flex-1">
            <CubeIcon className="h-6 w-6 violetHover" />
            <SheetTitle>Factory management</SheetTitle>
          </div>
          <SheetDescription>
            Streamlining manufacturing operations for efficiency.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          <Button
            variant="outline"
            className="violetHover"
            onClick={() => navigate("login")}
          >
            Log In
          </Button>
          <Button
            variant="default"
            className=""
            onClick={() => navigate("register")}
          >
            Register
          </Button>
        </div>
        <div className="grid gap-4 py-4">
          <Button
            variant="ghost"
            className="violetHover"
            onClick={() => scrollToSection("FeaturesSection")}
          >
            About us
          </Button>
          <Button
            variant="ghost"
            className="violetHover"
            onClick={() => scrollToSection("Stats")}
          >
            Stats
          </Button>
          <Button
            variant="ghost"
            className="violetHover"
            onClick={() => scrollToSection("Pricing")}
          >
            Pricing
          </Button>
          <Button
            variant="ghost"
            className="violetHover"
            onClick={() => scrollToSection("Contact")}
          >
            Contact us
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
