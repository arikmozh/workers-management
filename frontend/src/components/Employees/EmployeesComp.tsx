import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecentSales } from "@/components/Dashboard/recent-sales";
import { useSelector } from "react-redux";
import { Department, Employee, RootState, Shift } from "@/redux/interface";
import { Gift, UserCheck, UserX2, Users } from "lucide-react";
import { EmployeesByMonth } from "./employeesByMonth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AddEmployeeForm from "./AddEmployeeForm";

const EmployeesComp = () => {
  const employees: Employee[] = useSelector(
    (state: RootState) => state.employees
  );
  const shifts = useSelector((state: RootState) => state.shifts);
  const departments: Department[] = useSelector(
    (state: RootState) => state.departments
  );

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

  const onAddEmployee = (newEmployeeData) => {
    // Your logic for adding a new employee
    console.log("Adding employee:", newEmployeeData);
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Employees</h2>
        <div className="flex items-center space-x-2">
          {/* <CalendarDateRangePicker /> */}
          {/* <Button>Add employee</Button> */}
          <AddEmployeeForm
            departments={departments}
            onAddEmployee={onAddEmployee}
          />
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics" disabled>
            Analytics
          </TabsTrigger>
          <TabsTrigger value="reports" disabled>
            Reports
          </TabsTrigger>
          <TabsTrigger value="notifications" disabled>
            Notifications
          </TabsTrigger>
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
              <CardContent>
                {/* <RecentSales /> */}
                <div className="space-y-8">
                  {employees.map((emp, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between"
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
