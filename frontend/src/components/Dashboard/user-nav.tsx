import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "../ui/mode-toggle";
import { logout } from "@/utils/authUtils";
import { useDispatch, useSelector } from "react-redux";
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { doLogout } from "../../redux/actions";
import { RootState } from "@/redux/interface";
import { useEffect } from "react";

const getFirstAndLastLetters = (email: string): string => {
  // Ensure the email string is not empty and has at least two characters
  if (email && email.length >= 2) {
    const firstLetter = email[0].toUpperCase(); // Retrieve the first letter
    const lastLetter = email[email.length - 1].toUpperCase(); // Retrieve the last letter
    return firstLetter + lastLetter; // Return the combination of first and last letters
  } else {
    return ""; // Return an empty string if the email is empty or has less than two characters
  }
};

export function UserNav() {
  const store = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const logoutFunc = () => {
    logout();
    setTimeout(() => {
      navigate("/");
    }, 1000);
    dispatch(doLogout());
  };

  const letters = getFirstAndLastLetters(store.user[0]?.email);

  useEffect(() => {
    console.log(store);
  }, []);

  return (
    <DropdownMenu>
      <ModeToggle />

      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>{letters}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {store.user[0]?.fullName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {store.user[0]?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logoutFunc}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
