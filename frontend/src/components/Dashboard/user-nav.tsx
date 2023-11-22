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
  // const store = useSelector((state: RootState) => state);
  const users = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const logoutFunc = () => {
    logout();
    setTimeout(() => {
      navigate("/");
    }, 1000);
    dispatch(doLogout());
  };

  // const letters = getFirstAndLastLetters(store.user[0]?.email);
  const user = users && users.length > 0 ? users[0] : null; // Check for valid user

  const letters = user ? getFirstAndLastLetters(user.email) : ""; // Safely access user.email

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
          {user && ( // Check if user exists before accessing its properties
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user.fullName}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          )}
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="sm:block md:hidden" />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="sm:block md:hidden cursor-pointer"
            onClick={() => navigate("/dashboard/Analytics")}
          >
            Analytics
          </DropdownMenuItem>
          <DropdownMenuItem
            className=" sm:block md:hidden cursor-pointer"
            onClick={() => navigate("/dashboard/Departments")}
          >
            Departments
          </DropdownMenuItem>
          <DropdownMenuItem
            className="sm:block md:hidden cursor-pointer"
            onClick={() => navigate("/dashboard/Shifts")}
          >
            Shifts
          </DropdownMenuItem>
          <DropdownMenuItem
            className="sm:block md:hidden cursor-pointer"
            onClick={() => navigate("/dashboard/Employees")}
          >
            Employees
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => navigate("/dashboard/settings")}
          >
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logoutFunc} className="cursor-pointer">
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
