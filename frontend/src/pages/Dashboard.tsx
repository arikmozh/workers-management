import { MainNav } from "@/components/Dashboard/main-nav";
import { Search } from "@/components/Dashboard/search";
import { UserNav } from "@/components/Dashboard/user-nav";
import TeamSwitcher from "@/components/Dashboard/team-switcher";
import { Outlet } from "react-router-dom";
import { getAllData, loggedIn } from "../utils/authUtils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { updateRootState } from "../redux/actions";

export default function DashboardPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const allData = await getAllData();
      console.log(allData);
      dispatch(updateRootState(allData));
    };
    console.log("loggedIn", loggedIn());

    if (loggedIn() != null) {
      fetchData();
    }
  }, []);

  return (
    <>
      <div className="md:hidden">
        <img
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <img
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
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
    </>
  );
}
