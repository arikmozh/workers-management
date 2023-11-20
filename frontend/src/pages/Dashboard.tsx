import { MainNav } from "@/components/Dashboard/main-nav";
import { Search } from "@/components/Dashboard/search";
import { UserNav } from "@/components/Dashboard/user-nav";
import TeamSwitcher from "@/components/Dashboard/team-switcher";
import { Link, Outlet } from "react-router-dom";
// import { getAllData, loggedIn } from "../utils/authUtils";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
// import { updateRootState } from "../redux/actions";
import { CubeIcon } from "@radix-ui/react-icons";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
// import { RootState } from "@/redux/interface";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllData, isLoggedIn } from "../utils/authUtils";
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { updateRootState } from "../redux/actions";
import { useNavigate } from "react-router-dom";
// import { RootState } from "@/redux/interface";

export default function DashboardPage() {
  const checkPage = (link: string) => {
    return location.pathname.includes(link);
  };
  const dispatch = useDispatch();
  // const store = useSelector((state: RootState) => state);
  const navigate = useNavigate();

  // useEffect(() => {

  //   const fetchData = async () => {
  //     const allData = await getAllData();
  //     console.log("aaaaa", allData);
  //     dispatch(updateRootState(allData));
  //   };

  //   isLoggedIn()
  //     .then((res) => {
  //       console.log("ressss", res);
  //       if (res != "Success") {
  //         navigate("overview");
  //       } else {
  //         fetchData().then(() => {
  //           const lastVisitedURL =
  //             localStorage.getItem("lastVisitedURL") || "dashboard/overview";
  //           navigate(lastVisitedURL);
  //           // }
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       navigate("/login");
  //     });
  // }, []);

  useEffect(() => {
    const fetchDataAndNavigate = async () => {
      try {
        const allData = await getAllData();
        console.log("alll DATA", allData);

        dispatch(updateRootState(allData));
        const lastVisitedURL =
          localStorage.getItem("lastVisitedURL") || "/dashboard/analytics";
        navigate(lastVisitedURL);
      } catch (error) {
        console.error("Error fetching data:", error);
        navigate("/login");
      }
    };

    isLoggedIn()
      .then((res) => {
        console.log("ressss", res);
        if (res === "Success") {
          fetchDataAndNavigate();
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });
  }, []);

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
          <div className="flex  gap-4">
            <div className="flex space-x-4 mr-8 max-lg:flex-1">
              <CubeIcon className="h-6 w-6 violet" />
              <h3>Workers management</h3>
            </div>
          </div>
          <div className="flex space-x-4 justify-between items-center">
            <Link
              to="/dashboard/analytics"
              className={`text-sm font-medium  transition-colors hover:text-primary ${
                checkPage("analytics") == true ? "" : "text-muted-foreground"
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
                checkPage("settings") == true ? "" : "text-muted-foreground "
              }`}
            >
              Settings
            </Link>
          </div>
        </div>
        <div className="container text-left pt-4">
          <hr className=" pb-4" />
          <div className="flex justify-between">
            <p className="text-sm">
              &copy; 2023 Your Company. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-violet-600  cursor-pointer" />
              <Instagram className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all  text-violet-600 cursor-pointer" />
              <Twitter className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all  text-violet-600 cursor-pointer" />
              <Youtube className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all  text-violet-600 cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
