import { useEffect } from "react";
import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
// import DataTable from "./DataTable";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { spawn } from "child_process";

// import { addShiftToAPI } from "../../utils/workersUtils";
// /* eslint-disable @typescript-eslint/ban-ts-comment */
// // @ts-ignore
// import { doAddShift } from "../../redux/actions";

const ShiftComp = () => {
  const { id } = useParams();

  // const shift = useSelector((state: RootState) =>
  //   state.shifts.filter((s) => s._id === id)
  // );
  const departments = useSelector((state: RootState) => state.departments);
  const shifts = useSelector((state: RootState) => state.shifts);
  const [edit, setEdit] = useState(false);

  const [shift, setShift] = useState<Shift>({
    departmentId: "",
    shiftName: "",
    shiftDate: new Date(),
    shiftStartingHour: "",
    shiftEndingHour: "",
    shiftCreatedDate: new Date(),
    shiftEmployees: [],
  });

  // const navigate = useNavigate();

  useEffect(() => {
    console.log("ID from route:", id);
    console.log("shift:", shift);

    const foundShift = shifts.find((s) => s._id === id);
    if (foundShift) {
      setShift({
        departmentId: foundShift.departmentId,
        shiftName: foundShift.shiftName,
        shiftDate: new Date(foundShift.shiftDate),
        shiftStartingHour: foundShift.shiftStartingHour,
        shiftEndingHour: foundShift.shiftEndingHour,
        shiftCreatedDate: new Date(foundShift.shiftCreatedDate),
        shiftEmployees: foundShift.shiftEmployees,
      });
    }
  }, [id, shifts]); // Include shifts in the dependency array as well

  const getDepartmentName = (departmentId: string) => {
    const dep = departments.filter((dep) => {
      return dep._id == departmentId;
    });
    if (dep.length > 0) {
      return dep[0].departmentName;
    } else {
      return "";
    }
  };
  const getShiftDate = (shiftDate: string | Date) => {
    const date = new Date(shiftDate);
    const formattedDate = date.toLocaleDateString("en-US"); // or any other formatting method
    return formattedDate;
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Shift {shift.shiftName}
        </h2>
        {!edit && <Button onClick={() => setEdit(!edit)}>Edit shift</Button>}
        {edit && <Button onClick={() => setEdit(!edit)}>Save shift</Button>}
        {/* {
            edit==true ? (
                       <Button>
          Edit shift
        </Button>
 :                        <Button>
Save shift</span>
            )
          } */}
      </div>
      {/* <TabsContent value="overview" className="space-y-4"> */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Department</CardTitle>
            <Hash className="dark:hidden h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 hover:text-violet-600 cursor-pointer" />
            <Hash className="hidden dark:block h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hover:text-violet-600 cursor-pointer" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {/* <p className="text-xs text-muted-foreground">Departments</p> */}
              {getDepartmentName(shift.departmentId)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shift Name</CardTitle>
            <KanbanSquare className="dark:hidden h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 hover:text-violet-600 cursor-pointer" />
            <KanbanSquare className="hidden dark:block h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hover:text-violet-600 cursor-pointer" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shift.shiftName}</div>
            {/* <p className="text-xs text-muted-foreground">Shifts</p> */}
          </CardContent>
        </Card>
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shift Date</CardTitle>
            <User2 className="dark:hidden h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 hover:text-violet-600 cursor-pointer" />
            <User2 className="hidden dark:block h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hover:text-violet-600 cursor-pointer" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getShiftDate(shift.shiftDate)}
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Start Hour</CardTitle>
            <User2 className="dark:hidden h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 hover:text-violet-600 cursor-pointer" />
            <User2 className="hidden dark:block h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hover:text-violet-600 cursor-pointer" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shift.shiftStartingHour}</div>
          </CardContent>
        </Card>
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shift Date</CardTitle>
            <User2 className="dark:hidden h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 hover:text-violet-600 cursor-pointer" />
            <User2 className="hidden dark:block h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hover:text-violet-600 cursor-pointer" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shift.shiftEndingHour}</div>
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
            <div className="text-2xl font-bold">
              {shift.shiftEmployees.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* </TabsContent> */}
      {/* <div className="flex justify-between">
        <div className="">
          <Popover>
            <PopoverTrigger asChild>
              <Button>Add shift</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Add Shift</h4>
                  <p className="text-sm text-muted-foreground">
                    Enter shift details.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">Department:</Label>
                    <Select
                      onValueChange={(selectedValue) => {
                        setShift((prevShift) => ({
                          ...prevShift,
                          departmentId: selectedValue,
                        }));
                      }}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {departments.map((dep, index) => {
                            return (
                              <SelectItem key={index} value={dep._id}>
                                {dep.departmentName}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">Shift name:</Label>
                    <Input
                      id="width"
                      placeholder="Enter name"
                      className="col-span-2 h-8"
                      onChange={(e) => {
                        setShift({ ...shift, shiftName: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4 ">
                    <Label htmlFor="width">Shift date:</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[185px] pl-3 text-left font-normal",
                            !shiftDate && "text-muted-foreground"
                          )}
                        >
                          {shiftDate ? (
                            shiftDate.getDate() +
                            " / " +
                            shiftDate.getMonth() +
                            " / " +
                            shiftDate.getFullYear()
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={shiftDate}
                          onSelect={setShiftDate}
                          disabled={(date) => date <= new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">Start hour:</Label>
                    <Select onValueChange={handleStartHourChange}>
                      <SelectTrigger>
                        {startHour ? (
                          <span>{startHour}</span>
                        ) : (
                          <span>Select Hour</span>
                        )}
                      </SelectTrigger>
                      <SelectContent className="max-h-48 overflow-y-auto">
                        <SelectGroup>
                          {hours.map((hour) => (
                            <SelectItem key={hour} value={hour}>
                              {hour}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                      {startHour && <p> {startHour}</p>}
                    </Select>
                  </div>
                </div>
                {showEndHourSelect && startHour && (
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="width">End hour:</Label>
                      <Select onValueChange={handleEndHourChange}>
                        <SelectTrigger>
                          {endHour ? (
                            <span>{endHour}</span>
                          ) : (
                            <span>Select Hour</span>
                          )}
                        </SelectTrigger>
                        <SelectContent className="max-h-48 overflow-y-auto">
                          <SelectGroup>
                            {endHours.map((hour) => (
                              <SelectItem key={hour} value={hour}>
                                {hour}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                        {endHour && <p> {endHour}</p>}
                      </Select>
                    </div>
                  </div>
                )}
                <Button onClick={addShift}>Add</Button>
                {error && (
                  <span className="text-red-500">Something is missing</span>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-x-2 flex">
          <Input
            className="w-auto"
            onChange={(e) => setFilterSearch(e.target.value)}
          />
          <Button>
            <Search className="dark:hidden h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0  cursor-pointer" />
            <Search className="hidden dark:block h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100  cursor-pointer" />
          </Button>
        </div>
      </div> */}

      {/* <DataTable filterSearch={filterSearch} /> */}
    </div>
  );
};

export default ShiftComp;

interface Shift {
  departmentId: string;
  shiftName: string;
  shiftDate: Date;
  shiftStartingHour: string;
  shiftEndingHour: string;
  shiftCreatedDate: Date;
  shiftEmployees: string[];
}
