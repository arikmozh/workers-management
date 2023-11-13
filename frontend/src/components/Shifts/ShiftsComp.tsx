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

import { addShiftToAPI } from "../../utils/workersUtils";
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { doAddShift } from "../../redux/actions";

const ShiftsComp = () => {
  const [filterSearch, setFilterSearch] = useState("");
  // const store = useSelector((state: RootState) => state);
  const departments = useSelector((state: RootState) => state.departments);
  const shifts = useSelector((state: RootState) => state.shifts);
  const employees = useSelector((state: RootState) => state.employees);

  // const [departmentName, setDepartmentName] = useState("");
  const [shiftDate, setShiftDate] = React.useState<Date | undefined>(
    new Date()
  );
  const [startHour, setStartHour] = useState<string>("");
  const [endHour, setEndHour] = useState<string>("");
  const [showEndHourSelect, setShowEndHourSelect] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleStartHourChange = (selectedValue: string) => {
    setStartHour(selectedValue);
    shift.shiftStartingHour = selectedValue;
    setEndHour(""); // Reset end hour when start hour changes
    setShowEndHourSelect(true); // Display end hour select after selecting a start hour
  };

  const handleEndHourChange = (selectedValue: string) => {
    setEndHour(selectedValue);
    shift.shiftEndingHour = selectedValue;
  };

  const hours: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hour = `${String(h).padStart(2, "0")}:${String(m).padStart(
        2,
        "0"
      )}`;
      hours.push(hour);
    }
  }

  const [shift, setShift] = useState({
    departmentId: "",
    shiftName: "",
    shiftDate: shiftDate,
    shiftStartingHour: "",
    shiftEndingHour: "",
    shiftCreatedDate: new Date(),
    shiftEmployees: [],
  });

  const isShiftComplete = () => {
    if (
      shift.departmentId == "" ||
      shift.shiftName == "" ||
      shift.shiftStartingHour == "" ||
      shift.shiftEndingHour == ""
    ) {
      return false;
    }
    return true; // All keys are filled, return true
  };

  // const [toast, setToast] = useState(false);
  // const { toast: showToast } = useToast(); // Assuming useToast is a hook from your toast library
  const [error, setError] = useState(false);

  const addShift = async () => {
    console.log(shift);
    if (isShiftComplete() == true) {
      try {
        const data = await addShiftToAPI(shift);
        console.log(data); // Log the data received from the API call
        if (data) {
          dispatch(doAddShift(data));
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle the error if needed
        throw error;
      }
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const getEndHours = (startHour: string): string[] => {
    const parsedHour = startHour.split(":").map(Number);
    const startHourInMinutes = parsedHour[0] * 60 + parsedHour[1];

    const availableDurations = [7 * 60, 9 * 60, 12 * 60];
    const possibleEndHours = availableDurations.map((duration) => {
      const minutes = startHourInMinutes + duration;
      const endHour = `${String(Math.floor(minutes / 60)).padStart(
        2,
        "0"
      )}:${String(minutes % 60).padStart(2, "0")}`;
      return endHour;
    });

    return possibleEndHours;
  };
  const endHours: string[] =
    showEndHourSelect && startHour ? getEndHours(startHour) : [];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Shifts</h2>
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
            <div className="text-2xl font-bold">{departments.length}</div>
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
            <div className="text-2xl font-bold">{shifts.length}</div>
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
            <div className="text-2xl font-bold">{employees.length}</div>
            <p className="text-xs text-muted-foreground">Employees</p>
          </CardContent>
        </Card>
      </div>

      {/* </TabsContent> */}
      <div className="flex justify-between">
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
                        {/* <FormControl> */}
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
                        {/* </FormControl> */}
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
                          {/* <SelectItem value="">Select</SelectItem> */}
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
                            {/* <SelectItem value="">Select</SelectItem> */}
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

export default ShiftsComp;

// export function ToastDemo() {
//   const { toast } = useToast();

//   return (
//     <Button
//       variant="destructive"
//       onClick={() => {
//         toast({
//           title: "Scheduled: Catch up ",
//           description: "Friday, February 10, 2023 at 5:57 PM",
//           action: (
//             <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
//           ),
//         });
//       }}
//     >
//       Add to calendar
//     </Button>
//   );
// }
