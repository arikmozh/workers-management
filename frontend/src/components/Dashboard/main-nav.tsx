import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        to="/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        to="/dashboard/departments"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Departments
      </Link>
      <Link
        to="/dashboard/shifts"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Shifts
      </Link>
      <Link
        to="/dashboard/employees"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Employees
      </Link>
      <Link
        to="/dashboard/settings"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
    </nav>
  );
}
