import { MainNav } from "@/components/Dashboard/main-nav";
import { Search } from "@/components/Dashboard/search";
import { UserNav } from "@/components/Dashboard/user-nav";
import TeamSwitcher from "@/components/Dashboard/team-switcher";
import { Link, Outlet } from "react-router-dom";
import { getAllData, loggedIn } from "../utils/authUtils";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { updateRootState } from "../redux/actions";
import { CubeIcon } from "@radix-ui/react-icons";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { RootState } from "@/redux/interface";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state);
  // const navigate = useNavigate();
  useEffect(() => {
    console.log(store, "store");

    const fetchData = async () => {
      const allData = await getAllData();
      console.log("aaaaa", allData);
      dispatch(updateRootState(allData));

      // if (Array.isArray(allData) && allData.length == 0) {
      //   navigate("/login");
      // } else {
      //   dispatch(updateRootState(allData));
      // }
    };
    console.log("loggedIn", loggedIn());

    if (loggedIn() != null) {
      fetchData();
    }
  }, []);

  const checkPage = (link: string) => {
    return location.pathname.includes(link);
  };

  return (
    <>
      <div className="hidden flex-col md:flex min-h-screen">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        <Outlet />
      </div>
      <footer className="bg-var(--background) w-100">
        <div className="container grid lg:grid-cols-2 md:grid-cols-1 gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex space-x-4 mr-8 max-lg:flex-1">
              <CubeIcon className="h-6 w-6 violet" />
              <h3>Workers management</h3>
            </div>
            <p className="text-left">
              Making the world a better place through constructing elegant
              hierarchies.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-violet-600  cursor-pointer" />
              <Instagram className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all  text-violet-600 cursor-pointer" />
              <Twitter className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all  text-violet-600 cursor-pointer" />
              <Youtube className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all  text-violet-600 cursor-pointer" />
            </div>
          </div>
          <div className="flex space-x-4 justify-between items-center">
            <Link
              to="/dashboard/overview"
              className={`text-sm font-medium  transition-colors hover:text-primary ${
                checkPage("overview") == true ? "" : "text-muted-foreground"
              }`}
            >
              Overview
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
                checkPage("settings") == true ? "" : "text-muted-foreground "
              }`}
            >
              Settings
            </Link>
          </div>
        </div>
        <div className="container text-left pt-4">
          <hr className=" pb-4" />
          <p>&copy; 2023 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
