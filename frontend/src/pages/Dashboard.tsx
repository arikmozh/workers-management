// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { CalendarDateRangePicker } from "@/components/Dashboard/date-range-picker";
import { MainNav } from "@/components/Dashboard/main-nav";
// import { Overview } from "@/components/Dashboard/overview";
// import { RecentSales } from "@/components/Dashboard/recent-sales";
import { Search } from "@/components/Dashboard/search";
import { UserNav } from "@/components/Dashboard/user-nav";
import TeamSwitcher from "@/components/Dashboard/team-switcher";
import { Outlet } from "react-router-dom";
export default function DashboardPage() {
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
