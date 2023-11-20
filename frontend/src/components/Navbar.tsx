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
  // SheetFooter,
  // SheetClose,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";

export function Navbar() {
  // const [isMobileNavClicked, setIsMobileNavClicked] = useState(false);

  return (
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
                Item one
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] ">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          shadcn/ui
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Beautifully designed components built with Radix UI
                          and Tailwind CSS.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/docs" title="Introduction">
                    Re-usable components built using Radix UI and Tailwind CSS.
                  </ListItem>
                  <ListItem href="/docs/installation" title="Installation">
                    How to install dependencies and structure your app.
                  </ListItem>
                  <ListItem
                    href="/docs/primitives/typography"
                    title="Typography"
                  >
                    Styles for headings, paragraphs, lists...etc
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {/* <span className="sr-only">Open main menu</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" /> */}

        <Button variant="ghost" className="violetHover">
          Item two
        </Button>
        <Button variant="ghost" className="violetHover">
          Item three
        </Button>
      </div>
      <div className=" space-x-4 hidden md:flex">
        <Link to="login">
          <Button variant="ghost" className="violetHover">
            Log In
          </Button>
        </Link>
        <Button variant="default" className="gap-2 ">
          <GiftIcon className="h-5 w-5" />
          Register
        </Button>
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
          <Button variant="outline" className="violetHover">
            Log In{" "}
          </Button>
          <Button variant="default" className="">
            Register
          </Button>
        </div>
        <div className="grid gap-4 py-4">
          {/* <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
   
                Item one
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4">
                  <Button variant="ghost" className="hover:text-violet-600">
                    Item two
                  </Button>
                  <Button variant="ghost" className="hover:text-violet-600">
                    Item two
                  </Button>
                  <Button variant="ghost" className="hover:text-violet-600">
                    Item two
                  </Button>
                  <Button variant="ghost" className="hover:text-violet-600">
                    Item two
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion> */}
          <Button variant="ghost" className="violetHover">
            Item two
          </Button>
          <Button variant="ghost" className="violetHover">
            Item two
          </Button>
          <Button variant="ghost" className="violetHover">
            Item two
          </Button>
          <Button variant="ghost" className="violetHover">
            Item two
          </Button>
          <Button variant="ghost" className="violetHover">
            Item two
          </Button>
          <Button variant="ghost" className="violetHover">
            Item three
          </Button>
        </div>

        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
};
