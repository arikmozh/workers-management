import React, { useState } from "react";
import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { CalendarDateRangePicker } from "@/components/Dashboard/date-range-picker";
import DataTable from "./DataTable";
import { Input } from "../ui/input";
import AddDepartment from "./AddDepartment";
// import { Overview } from "@/components/Dashboard/overview";
// import { RecentSales } from "@/components/Dashboard/recent-sales";
// import { promises as fs } from "fs";
// import path from "path";

const DepartmentsComp = () => {
  const [filterSearch, setFilterSearch] = useState("");

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Departments</h2>
        <div className="flex items-center space-x-2">
          <Input onChange={(e) => setFilterSearch(e.target.value)} />
          {/* <CalendarDateRangePicker /> */}
          <Button>Filter</Button>
        </div>
      </div>
      <DataTable filterSearch={filterSearch} />

      <div className="text-right">
        <AddDepartment />
      </div>
    </div>
  );
};

export default DepartmentsComp;
