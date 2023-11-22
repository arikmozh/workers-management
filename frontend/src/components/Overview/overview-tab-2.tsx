import { TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSelector } from "react-redux";
import { Employee, RootState } from "@/redux/interface";
import { Gift, Hash, KanbanSquare, User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Overview } from "../Dashboard/overview";
const OverviewTab2 = () => {
  const departments = useSelector((state: RootState) => state.departments);
  const shifts = useSelector((state: RootState) => state.shifts);
  const employees = useSelector((state: RootState) => state.employees);

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

  return (
    <TabsContent value="analytics" className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
        <Card>
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
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>

        <Card className="col-span-3 w-full">
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
            <div className="space-y-8">
              {employees.map((emp, index) => {
                return (
                  <div
                    key={index}
                    // className="flex items-center justify-between"
                    className="flex items-center justify-between hover:border p-2 pl-3 pr-3 hover:rounded-lg "
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
  );
};

export default OverviewTab2;
