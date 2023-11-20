import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/components/Dashboard/date-range-picker";
import { Outlet, useNavigate } from "react-router-dom";
const OverviewComp = () => {
  const navigate = useNavigate();
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <div className="flex items-center space-x-2">
          <CalendarDateRangePicker />
          <Button>Download</Button>
        </div>
      </div>
      <Tabs defaultValue="analytics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="analytics" onClick={() => navigate("analytics")}>
            Analytics
          </TabsTrigger>
          <TabsTrigger value="reports" onClick={() => navigate("reports")}>
            Reports
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            onClick={() => navigate("notifications")}
          >
            Notifications
          </TabsTrigger>
        </TabsList>
        <Outlet />
      </Tabs>
    </div>
  );
};

export default OverviewComp;
