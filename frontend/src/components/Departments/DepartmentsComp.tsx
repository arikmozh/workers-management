import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import DataTable from "./DataTable";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hash, KanbanSquare, Search, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/interface";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { addDepartmentToAPI } from "../../utils/workersUtils";
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { doAddDepartment } from "../../redux/actions";

const DepartmentsComp = () => {
  const [filterSearch, setFilterSearch] = useState("");
  const store = useSelector((state: RootState) => state);
  const [departmentName, setDepartmentName] = useState("");
  const dispatch = useDispatch();

  const addDepartment = async () => {
    try {
      const data = await addDepartmentToAPI(departmentName);
      console.log(data); // Log the data received from the API call
      if (data) {
        dispatch(doAddDepartment(data));
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle the error if needed
      throw error;
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Departments</h2>
      </div>
      {/* <TabsContent value="overview" className="space-y-4"> */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Departments
            </CardTitle>
            <Hash className="dark:hidden h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 hover:text-violet-600 cursor-pointer" />
            <Hash className="hidden dark:block h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hover:text-violet-600 cursor-pointer" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{store.departments.length}</div>
            <p className="text-xs text-muted-foreground">Departments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Shifts</CardTitle>
            <KanbanSquare className="dark:hidden h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 hover:text-violet-600 cursor-pointer" />
            <KanbanSquare className="hidden dark:block h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hover:text-violet-600 cursor-pointer" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{store.shifts.length}</div>
            <p className="text-xs text-muted-foreground">Shifts</p>
          </CardContent>
        </Card>
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Employees
            </CardTitle>
            <User2 className="dark:hidden h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 hover:text-violet-600 cursor-pointer" />
            <User2 className="hidden dark:block h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hover:text-violet-600 cursor-pointer" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{store.employees.length}</div>
            <p className="text-xs text-muted-foreground">Employees</p>
          </CardContent>
        </Card>
      </div>

      {/* </TabsContent> */}
      <div className="flex justify-between">
        <div className="">
          {/* <AddDepartment /> */}
          <Popover>
            <PopoverTrigger asChild>
              <Button>Add department</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Add Department</h4>
                  <p className="text-sm text-muted-foreground">
                    Enter department name.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">Department:</Label>
                    <Input
                      id="width"
                      placeholder="department name"
                      className="col-span-2 h-8"
                      onChange={(e) => {
                        setDepartmentName(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <Button onClick={addDepartment}>Add</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-x-2 flex">
          <Input
            className="w-auto"
            onChange={(e) => setFilterSearch(e.target.value)}
          />
          {/* <CalendarDateRangePicker /> */}
          <Button>
            <Search className="dark:hidden h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0  cursor-pointer" />
            <Search className="hidden dark:block h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100  cursor-pointer" />
          </Button>
        </div>
      </div>

      <DataTable filterSearch={filterSearch} />
    </div>
  );
};

export default DepartmentsComp;
