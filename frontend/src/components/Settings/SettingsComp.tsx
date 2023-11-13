import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hash, KanbanSquare, User2 } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/interface";
import { Button } from "../ui/button";

const SettingsComp = () => {
  const user = useSelector((state: RootState) => state.user[0]);

  const [formData, setFormData] = useState<User>({
    fullName: user.fullName,
    email: user.email,
    phone: user.phone || "",
    password: user.password,
    maxActions: user.maxActions,
    packageId: user.packageId,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Handle saving the formData, you can send it to your backend or perform any necessary actions
    console.log("Saving:", formData);
  };

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    // <div className="flex-1 space-y-4 p-8 pt-6">
    //   <div className="flex items-center justify-between space-y-2">
    //     <h2 className="text-3xl font-bold tracking-tight">Shifts</h2>
    //   </div>
    //   {/* <TabsContent value="overview" className="space-y-4"> */}
    //   <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    //     <Card>
    //       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //         <CardTitle className="text-sm font-medium">
    //           Total Departments
    //         </CardTitle>
    //         <Hash className="dark:hidden h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 hover:text-violet-600 cursor-pointer" />
    //         <Hash className="hidden dark:block h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hover:text-violet-600 cursor-pointer" />
    //       </CardHeader>
    //       <CardContent>
    //         {/* <div className="text-2xl font-bold">{departments.length}</div> */}
    //         <p className="text-xs text-muted-foreground">Departments</p>
    //       </CardContent>
    //     </Card>
    //     <Card>
    //       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //         <CardTitle className="text-sm font-medium">Total Shifts</CardTitle>
    //         <KanbanSquare className="dark:hidden h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 hover:text-violet-600 cursor-pointer" />
    //         <KanbanSquare className="hidden dark:block h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hover:text-violet-600 cursor-pointer" />
    //       </CardHeader>
    //       <CardContent>
    //         {/* <div className="text-2xl font-bold">{shifts.length}</div> */}
    //         <p className="text-xs text-muted-foreground">Shifts</p>
    //       </CardContent>
    //     </Card>
    //     <Card className="md:col-span-2 lg:col-span-1">
    //       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //         <CardTitle className="text-sm font-medium">
    //           Total Employees
    //         </CardTitle>
    //         <User2 className="dark:hidden h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 hover:text-violet-600 cursor-pointer" />
    //         <User2 className="hidden dark:block h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hover:text-violet-600 cursor-pointer" />
    //       </CardHeader>
    //       <CardContent>
    //         {/* <div className="text-2xl font-bold">{employees.length}</div> */}
    //         <p className="text-xs text-muted-foreground">Employees</p>
    //       </CardContent>
    //     </Card>
    //   </div>
    // </div>
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>

      <div className="max-w-lg pt-6 gap-4 rounded-md grid grid-cols-2">
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium  text-left"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData?.fullName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium  text-left"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData?.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-left"
          >
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData?.phone}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-left"
          >
            Password
          </label>
          {/* <p className="mt-1 p-2 border rounded-md bg-gray-100" readOnly>
            {formData.password}
          </p> */}

          <input
            readOnly
            type="password"
            id="password"
            name="password"
            value={formData?.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100"
            disabled
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="maxActions"
            className="block text-sm font-medium text-left"
          >
            Max Actions
          </label>
          <p
            className="mt-1 p-2 border rounded-md bg-gray-100 opacity-50 text-left"
            readOnly
          >
            {formData.maxActions}
          </p>
        </div>

        <div className="mb-4">
          <label
            htmlFor="packageId"
            className="block text-sm font-medium text-gray-600"
          >
            Package ID
          </label>
          {/* <input
            type="text"
            id="packageId"
            name="packageId"
            value={formData.packageId}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:border-blue-300"
            disabled
          /> */}
          <input
            type="text"
            id="packageId"
            name="packageId"
            value={formData?.packageId}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            disabled
          />
        </div>

        <div className="flex justify-start">
          <Button onClick={handleSave}>save</Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsComp;

interface User {
  _id?: string; // Make _id optional
  fullName: string;
  email: string;
  phone: string;
  password: string;
  maxActions: number;
  packageId: number;
}
