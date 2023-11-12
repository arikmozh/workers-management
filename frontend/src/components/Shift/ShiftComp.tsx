import { useEffect } from "react";
import { useParams } from "react-router-dom";
import React, { useState, Fragment } from "react";
import { Button } from "@/components/ui/button";
// import DataTable from "./DataTable";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hash, KanbanSquare, Search, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Employee, RootState } from "@/redux/interface";
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
import { Listbox } from "@headlessui/react";

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
  const employees = useSelector((state: RootState) => state.employees);
  const [edit, setEdit] = useState(true);

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
  // const people: Person[] = [
  //   { id: 1, name: "Durward Reynolds" },
  //   { id: 2, name: "Kenton Towne" },
  //   { id: 3, name: "Therese Wunsch" },
  //   { id: 4, name: "Benedict Kessler" },
  //   { id: 5, name: "Katelyn Rohan" },
  // ];
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);
  // const toggleSelection = (person: Person) => {
  //   if (selectedPeople.includes(person)) {
  //     // If person is already selected, remove it
  //     setSelectedPeople((prevSelected) =>
  //       prevSelected.filter((selectedPerson) => selectedPerson !== person)
  //     );
  //   } else {
  //     // If person is not selected, add it
  //     setSelectedPeople((prevSelected) => [...prevSelected, person]);
  //   }
  // };

  // const toggleSelection = (employee: Employee) => {
  //   console.log(employee, "emmmmp");

  //   const isPersonSelected = selectedEmployees.some(
  //     (selectedEmployee) => selectedEmployee._id === employee._id
  //   );
  //   console.log(isPersonSelected);

  //   if (isPersonSelected == true) {
  //     // If person is already selected, remove it
  //     setSelectedEmployees((prevSelected) =>
  //       prevSelected.filter(
  //         (selectedPerson) => selectedPerson._id !== employee._id
  //       )
  //     );
  //   } else {
  //     // If person is not selected, add it
  //     setSelectedEmployees((prevSelected) => [...prevSelected, employee]);
  //   }
  //   console.log(selectedEmployees);
  // };

  const toggleSelection = (employee: Employee | string) => {
    console.log(employee, "selection");

    if (typeof employee === "string") {
      // Handle the case where a string (employee name) is provided
      // You might want to find the employee object based on the name
      const employeeObject = employees.find(
        (emp) => emp.employeeName === employee
      );

      if (employeeObject) {
        const isPersonSelected = selectedEmployees.some(
          (selectedEmployee) => selectedEmployee._id === employeeObject._id
        );

        if (isPersonSelected) {
          // If person is already selected, remove it
          setSelectedEmployees((prevSelected) =>
            prevSelected.filter(
              (selectedPerson) => selectedPerson._id !== employeeObject._id
            )
          );
        } else {
          // If person is not selected, add it
          setSelectedEmployees((prevSelected) => [
            ...prevSelected,
            employeeObject,
          ]);
        }
      }
    } else {
      // Handle the case where an employee object is provided
      const isPersonSelected = selectedEmployees.some(
        (selectedEmployee) => selectedEmployee._id === employee._id
      );

      if (isPersonSelected) {
        // If person is already selected, remove it
        setSelectedEmployees((prevSelected) =>
          prevSelected.filter(
            (selectedPerson) => selectedPerson._id !== employee._id
          )
        );
      } else {
        // If person is not selected, add it
        setSelectedEmployees((prevSelected) => [...prevSelected, employee]);
      }
    }
  };

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
      setShiftDate(new Date(foundShift.shiftDate));
      console.log(foundShift.shiftEmployees);
      const selectedEmployees = getEmployeesByIds(
        employees,
        foundShift.shiftEmployees
      );
      console.log(selectedEmployees, "selectedEmployees");

      setSelectedEmployees(selectedEmployees);
    }
    console.log("foundShift", foundShift);
    console.log(employees, "Employees");
  }, [id, shifts]); // Include shifts in the dependency array as well

  const getEmployeesByIds = (employees: Employee[], employeeIds: string[]) => {
    return employees.filter((employee) => employeeIds.includes(employee._id));
  };

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
  const [shiftDate, setShiftDate] = useState<Date | undefined>(new Date());
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
        <h2 className="text-3xl font-bold tracking-tight">
          Shift {shift.shiftName}
        </h2>
        {/* {!edit && <Button onClick={() => setEdit(!edit)}>Edit shift</Button>}
        {edit && <Button onClick={() => setEdit(!edit)}>Save shift</Button>} */}
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

      <div>
        {edit == true && (
          <div className="container p-4">
            <h1 className="text-xl text-left text-violet-500 font-medium	">
              Edit Shift
            </h1>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center  justify-between">
                <Label>Department:</Label>
                <Select
                  onValueChange={(selectedValue) => {
                    setShift((prevShift) => ({
                      ...prevShift,
                      departmentId: selectedValue,
                    }));
                  }}
                  defaultValue={shift.departmentId}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {/* {departments.map((dep, index) => {
                        return (
                          <SelectItem key={index} value={dep._id}>
                            {dep.departmentName}
                          </SelectItem>
                        );
                      })} */}
                      {departments.map((dep) => {
                        return (
                          <SelectItem key={dep._id} value={dep._id}>
                            {dep.departmentName}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center  justify-between">
                <Label>Shift Name:</Label>
                <Input
                  value={shift.shiftName}
                  onChange={(e) => {
                    setShift((prevShift) => ({
                      ...prevShift,
                      shiftName: e.target.value,
                    }));
                  }}
                  className="w-[180px]"
                />
              </div>
              <div className="flex items-center  justify-between">
                <Label>Shift Date:</Label>
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
                        (shiftDate.getMonth() + 1) +
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
                      onSelect={setShiftDate}
                      selected={shiftDate}
                      disabled={(date) => date <= new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center  justify-between">
                <Label htmlFor="width">Start hour:</Label>
                <Select
                  onValueChange={handleStartHourChange}
                  defaultValue={shift.shiftStartingHour}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select start hour" />

                    {/* {startHour ? (
                      <span>{startHour}</span>
                    ) : (
                      <span>Select Hour</span>
                    )} */}
                  </SelectTrigger>
                  <SelectContent className="max-h-48 overflow-y-auto ">
                    <SelectGroup>
                      {/* <SelectItem value="">Select</SelectItem> */}
                      {hours.map((hour) => (
                        <SelectItem key={hour} value={hour}>
                          {hour}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                  {/* {startHour && <p> {startHour}</p>} */}
                </Select>
              </div>
              {/* {showEndHourSelect && startHour && ( */}
              <div className="flex items-center  justify-between">
                <Label htmlFor="width">End hour:</Label>
                <Select
                  onValueChange={handleEndHourChange}
                  defaultValue={shift.shiftEndingHour}
                  disabled={!showEndHourSelect}
                >
                  <SelectTrigger className="w-[180px]">
                    {!showEndHourSelect && <span>{shift.shiftEndingHour}</span>}
                    <SelectValue placeholder="Select end hour" />
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
                  {/* {endHour && <p> {endHour}</p>} */}
                </Select>
              </div>
              {/* <div className="flex items-center  justify-between">
                <Button>Save shift</Button>
              </div> */}
              <div className="flex items-center  justify-between">
                <Label htmlFor="width">Employees:</Label>
                <div className="w-[180px]">
                  <Listbox value={selectedEmployees} multiple>
                    {/* onChange={(newSelection) => toggleSelection(newSelection)} */}
                    <Listbox.Button
                      className="relative h-10 items-center justify-between rounded-md border
                    border-input bg-background px-3 py-2 text-sm
                    ring-offset-background placeholder:text-muted-foreground
                    focus:outline-none focus:ring-2 focus:ring-ring
                    focus:ring-offset-2 disabled:cursor-not-allowed
                    disabled:opacity-50 w-[180px] whitespace-nowrap overflow-hidden text-overflow-ellipsis"
                    >
                      {selectedEmployees.length === 0 && "Select employees"}
                      {selectedEmployees.length <= 2 &&
                        selectedEmployees.map((employee, index) => (
                          <Fragment key={index}>
                            {employee.employeeName} ,{" "}
                          </Fragment>
                        ))}
                      {selectedEmployees.length > 2 &&
                        selectedEmployees.length.toString() + " employees"}
                    </Listbox.Button>
                    <Listbox.Options className="absolute w-[180px] mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-center shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                      {employees.map((employee, index) => (
                        <Listbox.Option
                          key={index}
                          value={employee.employeeName}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-violet-100 text-violet-900"
                                : "text-gray-900"
                            }`
                          }
                          onClick={() => toggleSelection(employee)}
                        >
                          <div className="flex items-center">
                            {employee.employeeName}
                            {selectedEmployees.some(
                              (selectedPerson) =>
                                selectedPerson._id === employee._id
                            ) && (
                              <span className="text-violet-500 ml-2">v</span>
                            )}
                          </div>
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Listbox>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
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
