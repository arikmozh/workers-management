import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const location = useLocation();

  const checkPage = (link: string) => {
    return location.pathname.includes(link);
  };

  return (
    <nav
      className={cn(
        "hidden md:flex items-center space-x-4 lg:space-x-6",
        className
      )}
      {...props}
    >
      <Link
        to="/dashboard/analytics"
        className={`text-sm font-medium  transition-colors hover:text-primary ${
          checkPage("analytics") == true || checkPage("reports") == true
            ? ""
            : "text-muted-foreground"
        }`}
      >
        Analytics
      </Link>
      <Link
        to="/dashboard/departments"
        className={`text-sm font-medium  transition-colors hover:text-primary ${
          checkPage("departments") == true ? "" : "text-muted-foreground"
        }`}
      >
        Departments
      </Link>
      <Link
        to="/dashboard/shifts"
        className={`text-sm font-medium  transition-colors hover:text-primary ${
          checkPage("shifts") == true ? "" : "text-muted-foreground"
        }`}
      >
        Shifts
      </Link>
      <Link
        to="/dashboard/employees"
        className={`text-sm font-medium  transition-colors hover:text-primary ${
          checkPage("employees") == true ? "" : "text-muted-foreground"
        }`}
      >
        Employees
      </Link>
      <Link
        to="/dashboard/settings"
        className={`text-sm font-medium  transition-colors hover:text-primary ${
          checkPage("settings") == true ? "" : "text-muted-foreground"
        }`}
      >
        Settings
      </Link>
    </nav>
  );
}
