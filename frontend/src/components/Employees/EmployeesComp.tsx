import React, { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { Department, Employee, RootState, Shift } from "@/redux/interface";
import { Gift, UserCheck, UserX2, Users } from "lucide-react";
import { EmployeesByMonth } from "./employeesByMonth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AddEmployeeForm from "./AddEmployeeForm";
import { addEmployeeToAPI } from "@/utils/workersUtils";
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { doAddEmployee } from "../../redux/actions";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const EmployeesComp = () => {
  const dispatch = useDispatch();
  const employees: Employee[] = useSelector(
    (state: RootState) => state.employees
  );
  const shifts = useSelector((state: RootState) => state.shifts);
  const departments: Department[] = useSelector(
    (state: RootState) => state.departments
  );
  const [activeTab, setActiveTab] = useState("overview");

  const [editableEmp, setEditableEmp] = useState({
    _id: "",
    userId: "",
    departmentId: "",
    startingDate: "",
    employeeName: "",
    employeeAge: "",
    employeeContact: "",
    employeeSalaryPerHour: 0,
  });

  const [showEmployeeListTab, setShowEmployeeListTab] = useState(false);

  useEffect(() => {
    console.log(employees);
    console.log(shifts);
    console.log(
      "getEmployeesCountPerShift",
      getEmployeesCountPerShift(employees, shifts)
    );
    console.log(
      "getEmployeesAssignedToAnyShift",
      getEmployeesAssignedToAnyShift(employees, shifts)
    );
    console.log(
      "getEmployeesNotAssignedToAnyShift",
      getEmployeesNotAssignedToAnyShift(employees, shifts)
    );
  }, []);

  const getEmployeesCountPerShift = (
    employees: Employee[],
    shifts: Shift[]
  ) => {
    // Create an object to store the count for each shift
    const employeesCountPerShift: { [key: string]: number } = {};

    // Iterate over each shift
    shifts.forEach((shift) => {
      // Get the IDs of employees assigned to the current shift
      const assignedEmployeeIds = shift.shiftEmployees || [];

      // Filter employees array based on assigned IDs
      const assignedEmployees = employees.filter((employee) =>
        assignedEmployeeIds.includes(employee._id)
      );

      // Assign the count to the corresponding shift ID
      employeesCountPerShift[shift.shiftName] = assignedEmployees.length;
    });

    return employeesCountPerShift;
  };

  const getEmployeesAssignedToAnyShift = (
    employees: Employee[],
    shifts: Shift[]
  ): Employee[] => {
    const assignedEmployeeIds: string[] = [];
    shifts.forEach((shift) => {
      assignedEmployeeIds.push(...(shift.shiftEmployees || []));
    });

    const uniqueAssignedEmployeeIds = [...new Set(assignedEmployeeIds)];
    return employees.filter((employee) =>
      uniqueAssignedEmployeeIds.includes(employee._id)
    );
  };

  const getEmployeesNotAssignedToAnyShift = (
    employees: Employee[],
    shifts: Shift[]
  ): Employee[] => {
    const assignedEmployeeIds: string[] = [];
    shifts.forEach((shift) => {
      assignedEmployeeIds.push(...(shift.shiftEmployees || []));
    });

    const uniqueAssignedEmployeeIds = [...new Set(assignedEmployeeIds)];
    return employees.filter(
      (employee) => !uniqueAssignedEmployeeIds.includes(employee._id)
    );
  };

  const getRandomEmployee = (employees: Employee[]): Employee | undefined => {
    if (employees.length === 0) {
      return undefined; // Return undefined if the array is empty
    }

    const randomIndex = Math.floor(Math.random() * employees.length);
    return employees[randomIndex];
  };

  const getInitials = (fullName: string): string => {
    const words = fullName.split(" ");

    if (words.length === 1) {
      // If there's only one word, return the first two letters
      return fullName.slice(0, 2).toUpperCase();
    } else {
      // If there are two or more words, return the first letters from the first and second words
      return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
    }
  };

  const getShiftDate = (shiftDate: string | Date) => {
    const date = new Date(shiftDate);
    const formattedDate = date.toLocaleDateString("en-US"); // or any other formatting method
    return formattedDate;
  };

  const getDepartmentName = (id: string) => {
    const dep = departments.filter((dep) => {
      return dep._id == id;
    });
    return dep[0].departmentName;
  };

  const handleEditEmloyee = (emp: Employee) => {
    console.log(emp);
    setEditableEmp({
      ...editableEmp,
      _id: emp._id,
      userId: emp.userId,
      departmentId: emp.departmentId,
      startingDate: emp.startingDate.toString(),
      employeeName: emp.employeeName,
      employeeAge: emp.employeeAge,
      employeeContact: emp.employeeContact,
      employeeSalaryPerHour: emp.employeeSalaryPerHour,
    });
    console.log(editableEmp, "edittttt");
    setActiveTab("employee");
    setShowEmployeeListTab(true);
  };

  const generateAges = (): number[] => {
    return Array.from({ length: 50 }, (_, index) => index + 18);
  };
  const agesArray = generateAges();
  const salariesArray = [35, 50];
  const [error, setError] = useState(false);

  type Employ = {
    userId: string;
    departmentId: string;

    startingDate: string;
    employeeName: string;
    employeeAge: string;
    employeeContact: string;
    employeeSalaryPerHour: number;
  };

  const onAddEmployee = async (newEmployeeData: Employ) => {
    // Your logic for adding a new employee
    console.log("Adding employee:", newEmployeeData);
    try {
      const data = await addEmployeeToAPI(newEmployeeData);
      console.log(data);
      if (data) {
        dispatch(doAddEmployee(data));
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Employees</h2>

        {activeTab != "employee" && (
          <div className="flex items-center space-x-2">
            <AddEmployeeForm onAddEmployee={onAddEmployee} />
          </div>
        )}
      </div>
      <Tabs
        id="tabs"
        value={activeTab}
        defaultValue="overview"
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger
            value="overview"
            onClick={() => {
              setActiveTab("overview");
              setShowEmployeeListTab(false);
            }}
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="employeeList"
            onClick={() => {
              setActiveTab("employeeList");
              setShowEmployeeListTab(false);
            }}
          >
            Employee List
          </TabsTrigger>
          <TabsTrigger
            id="employeeTabTrigger"
            value="employee"
            disabled
            className={showEmployeeListTab ? "" : "hidden"}
          >
            {editableEmp.employeeName}
          </TabsTrigger>
          {/* <TabsTrigger value="notifications" disabled>
            Notifications
          </TabsTrigger> */}
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Employees
                </CardTitle>
                <Users />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{employees.length}</div>
                <p className="text-xs text-muted-foreground">Employees</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Employee Assigned
                </CardTitle>
                <UserCheck />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {getEmployeesAssignedToAnyShift(employees, shifts).length}
                </div>
                <p className="text-xs text-muted-foreground">Employees</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Employee Not Assigned
                </CardTitle>
                <UserX2 />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {getEmployeesNotAssignedToAnyShift(employees, shifts).length}
                </div>
                <p className="text-xs text-muted-foreground">Employees</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Today Birthdays
                </CardTitle>
                <Gift />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {getRandomEmployee(employees)?.employeeName}
                </div>
                <p className="text-xs text-muted-foreground">Happy Birthday!</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>New Employees By Month</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <EmployeesByMonth employeesData={employees} />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Employees List</CardTitle>
                <CardDescription>
                  You have {employees.length} employees.
                </CardDescription>
              </CardHeader>
              <CardContent
                className="overflow-auto max-h-[350px]"
                style={{
                  scrollbarWidth: "thin", // Firefox
                  scrollbarColor: "#4f46e5 #cbd5e0", // Firefox
                }}
              >
                {/* <RecentSales /> */}
                <div className="space-y-8">
                  {employees.map((emp, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => handleEditEmloyee(emp)}
                        // className="flex items-center justify-between"
                        className="flex items-center justify-between hover:border p-2 pl-3 pr-3 hover:rounded-lg cursor-pointer"
                      >
                        <Avatar className="h-9 w-9">
                          <AvatarImage src="/avatars/01.png" alt="Avatar" />
                          <AvatarFallback>
                            {getInitials(emp.employeeName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1 text-center">
                          <p className="text-sm font-medium leading-none">
                            {emp.employeeName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {emp.employeeContact}
                          </p>
                        </div>
                        <div className=" font-medium">
                          {getShiftDate(emp.startingDate)}
                        </div>
                        <div className=" font-medium">
                          {getDepartmentName(emp.departmentId)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="employeeList" className="space-y-4">
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Employees List</CardTitle>
              <CardDescription>
                You have {employees.length} employees.
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-auto max-h-[350px]">
              <div className="space-y-8">
                {employees.map((emp, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between hover:border p-2 pl-3 pr-3 hover:rounded-lg cursor-pointer"
                      onClick={() => handleEditEmloyee(emp)}
                    >
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="/avatars/01.png" alt="Avatar" />
                        <AvatarFallback>
                          {getInitials(emp.employeeName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1 text-center">
                        <p className="text-sm font-medium leading-none">
                          {emp.employeeName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {emp.employeeContact}
                        </p>
                      </div>
                      <div className=" font-medium">
                        {getShiftDate(emp.startingDate)}
                      </div>
                      <div className=" font-medium">
                        {getDepartmentName(emp.departmentId)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {showEmployeeListTab && (
          <TabsContent value="employee" className="space-y-4">
            <Card className="">
              <CardContent className="p-8 overflow-auto ">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    {/* <h4 className="font-medium leading-none">Add employee</h4> */}
                    <p className="text-sm text-left text-muted-foreground">
                      Edit employee details.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="width">Department:</Label>
                      <Select
                      // onValueChange={(selectedValue) => {
                      //   setEmployee((prevEmployee) => ({
                      //     ...prevEmployee,
                      //     departmentId: selectedValue,
                      //   }));
                      // }}
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
                      <Label htmlFor="name">Full name:</Label>
                      <Input
                        id="name"
                        placeholder="Enter name"
                        className="col-span-2 h-8"
                        // onChange={(e) => {
                        //   setEmployee({
                        //     ...employee,
                        //     employeeName: e.target.value,
                        //   });
                        // }}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="phone">Phone:</Label>
                      <Input
                        type="text"
                        id="phone"
                        placeholder="Enter phone"
                        className="col-span-2 h-8"
                        // value={employee.employeeContact}
                        // onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="age">Age:</Label>
                    <Select
                    // onValueChange={(selectedValue) => {
                    //   setEmployee((prevEmployee) => ({
                    //     ...prevEmployee,
                    //     employeeAge: selectedValue,
                    //   }));
                    // }}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select age" />
                      </SelectTrigger>
                      <SelectContent
                        style={{ maxHeight: "150px", overflowY: "auto" }}
                      >
                        <SelectGroup>
                          {agesArray.map((age, index) => {
                            return (
                              <SelectItem
                                key={index}
                                value={age.toString()}
                                className="cursor-pointer"
                              >
                                {age}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="salary">Salary:</Label>
                    <Select
                    // onValueChange={(selectedValue) => {
                    //   setEmployee((prevEmployee) => ({
                    //     ...prevEmployee,
                    //     employeeSalaryPerHour: +selectedValue,
                    //   }));
                    // }}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select salary" />
                      </SelectTrigger>
                      <SelectContent
                        style={{ maxHeight: "150px", overflowY: "auto" }}
                      >
                        <SelectGroup>
                          {salariesArray.map((amount, index) => {
                            return (
                              <SelectItem
                                key={index}
                                value={amount.toString()}
                                className="cursor-pointer"
                              >
                                {index == 0 && "new employee"}
                                {index == 1 && "manager"}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                  // onClick={(e) => addEmployee(e)}
                  >
                    Add
                  </Button>
                  {error && (
                    <span className="text-red-500">Something is missing</span>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
    // <div className="flex-1 space-y-4 p-8 pt-6">
    //   <div className="flex items-center justify-between space-y-2">
    //     <h2 className="text-3xl font-bold tracking-tight">Employees</h2>
    //     <div className="flex items-center space-x-2">
    //       <CalendarDateRangePicker />
    //       <Button>Download</Button>
    //     </div>
    //   </div>
    //   <Tabs defaultValue="overview" className="space-y-4">
    //     <TabsList>
    //       <TabsTrigger value="overview">Overview</TabsTrigger>
    //       <TabsTrigger value="analytics" disabled>
    //         Analytics
    //       </TabsTrigger>
    //       <TabsTrigger value="reports" disabled>
    //         Reports
    //       </TabsTrigger>
    //       <TabsTrigger value="notifications" disabled>
    //         Notifications
    //       </TabsTrigger>
    //     </TabsList>
    //     <TabsContent value="overview" className="space-y-4">
    //       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    //         <Card>
    //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //             <CardTitle className="text-sm font-medium">
    //               Total Revenue
    //             </CardTitle>
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               viewBox="0 0 24 24"
    //               fill="none"
    //               stroke="currentColor"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth="2"
    //               className="h-4 w-4 text-muted-foreground"
    //             >
    //               <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    //             </svg>
    //           </CardHeader>
    //           <CardContent>
    //             <div className="text-2xl font-bold">$45,231.89</div>
    //             <p className="text-xs text-muted-foreground">
    //               +20.1% from last month
    //             </p>
    //           </CardContent>
    //         </Card>
    //         <Card>
    //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //             <CardTitle className="text-sm font-medium">
    //               Subscriptions
    //             </CardTitle>
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               viewBox="0 0 24 24"
    //               fill="none"
    //               stroke="currentColor"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth="2"
    //               className="h-4 w-4 text-muted-foreground"
    //             >
    //               <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    //               <circle cx="9" cy="7" r="4" />
    //               <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    //             </svg>
    //           </CardHeader>
    //           <CardContent>
    //             <div className="text-2xl font-bold">+2350</div>
    //             <p className="text-xs text-muted-foreground">
    //               +180.1% from last month
    //             </p>
    //           </CardContent>
    //         </Card>
    //         <Card>
    //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //             <CardTitle className="text-sm font-medium">Sales</CardTitle>
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               viewBox="0 0 24 24"
    //               fill="none"
    //               stroke="currentColor"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth="2"
    //               className="h-4 w-4 text-muted-foreground"
    //             >
    //               <rect width="20" height="14" x="2" y="5" rx="2" />
    //               <path d="M2 10h20" />
    //             </svg>
    //           </CardHeader>
    //           <CardContent>
    //             <div className="text-2xl font-bold">+12,234</div>
    //             <p className="text-xs text-muted-foreground">
    //               +19% from last month
    //             </p>
    //           </CardContent>
    //         </Card>
    //         <Card>
    //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //             <CardTitle className="text-sm font-medium">
    //               Active Now
    //             </CardTitle>
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               viewBox="0 0 24 24"
    //               fill="none"
    //               stroke="currentColor"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth="2"
    //               className="h-4 w-4 text-muted-foreground"
    //             >
    //               <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    //             </svg>
    //           </CardHeader>
    //           <CardContent>
    //             <div className="text-2xl font-bold">+573</div>
    //             <p className="text-xs text-muted-foreground">
    //               +201 since last hour
    //             </p>
    //           </CardContent>
    //         </Card>
    //       </div>
    //       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
    //         <Card className="col-span-4">
    //           <CardHeader>
    //             <CardTitle>Overview</CardTitle>
    //           </CardHeader>
    //           <CardContent className="pl-2">
    //             <Overview />
    //           </CardContent>
    //         </Card>
    //         <Card className="col-span-3">
    //           <CardHeader>
    //             <CardTitle>Recent Sales</CardTitle>
    //             <CardDescription>
    //               You made 265 sales this month.
    //             </CardDescription>
    //           </CardHeader>
    //           <CardContent>
    //             <RecentSales />
    //           </CardContent>
    //         </Card>
    //       </div>
    //     </TabsContent>
    //   </Tabs>
    // </div>
  );
};

export default EmployeesComp;
