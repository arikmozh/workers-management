import React, { ChangeEvent, useEffect, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RootState } from "@/redux/interface";
import { Button } from "../ui/button";
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
import { Input } from "../ui/input";
import { useSelector } from "react-redux";

interface AddEmployeeFormProps {
  // departments: Department[];
  onAddEmployee: (employeeData: Employ) => void;
}

type Employ = {
  userId: string;
  departmentId: string;

  startingDate: string;
  employeeName: string;
  employeeAge: string;
  employeeContact: string;
  employeeSalaryPerHour: number;
};

const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({
  // departments,
  onAddEmployee,
}) => {
  // const user = useSelector((state: RootState) => state.user);
  const departments = useSelector((state: RootState) => state.departments);
  const [popoverContentRef, setPopoverContentRef] =
    useState<HTMLDivElement | null>(null);

  const [employee, setEmployee] = useState({
    userId: "",
    departmentId: "",
    startingDate: new Date().toISOString(),
    employeeName: "",
    employeeAge: "",
    employeeContact: "",
    employeeSalaryPerHour: 0,
  });

  useEffect(() => {
    const user = sessionStorage.getItem("Workers");
    if (user != null) {
      const parsedJson = JSON.parse(user).id;
      setEmployee({ ...employee, userId: parsedJson });
    }
    console.log(user);
  }, []);
  const generateAges = (): number[] => {
    return Array.from({ length: 50 }, (_, index) => index + 18);
  };
  const agesArray = generateAges();
  const salariesArray = [35, 50];
  const [error, setError] = useState(false);
  const addEmployee = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Check if all fields are not empty
    if (Object.values(employee).every((value) => value !== "")) {
      // All fields are filled, proceed with adding the employee

      onAddEmployee(employee);
      popoverContentRef?.getBoundingClientRect(); // This forces a reposition, causing the popover to close

      // You can add further logic here to handle the addition of the employee
    } else {
      // Some fields are empty, show an error message or handle accordingly
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const result = event.target.value.replace(/\D/g, "");
    setEmployee({
      ...employee,
      employeeContact: result.slice(0, 10), // Limit to 10 digits
    });
  };

  return (
    <div className="">
      <Popover>
        <PopoverTrigger asChild>
          <Button>Add employee</Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-80"
          ref={(ref) => setPopoverContentRef(ref)}
        >
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Add employee</h4>
              <p className="text-sm text-muted-foreground">
                Enter employee details.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="width">Department:</Label>
                <Select
                  onValueChange={(selectedValue) => {
                    setEmployee((prevEmployee) => ({
                      ...prevEmployee,
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
                <Label htmlFor="name">Full name:</Label>
                <Input
                  id="name"
                  placeholder="Enter name"
                  className="col-span-2 h-8"
                  onChange={(e) => {
                    setEmployee({
                      ...employee,
                      employeeName: e.target.value,
                    });
                  }}
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
                  value={employee.employeeContact}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="age">Age:</Label>
              <Select
                onValueChange={(selectedValue) => {
                  setEmployee((prevEmployee) => ({
                    ...prevEmployee,
                    employeeAge: selectedValue,
                  }));
                }}
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
                onValueChange={(selectedValue) => {
                  setEmployee((prevEmployee) => ({
                    ...prevEmployee,
                    employeeSalaryPerHour: +selectedValue,
                  }));
                }}
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

            <Button onClick={(e) => addEmployee(e)}>Add</Button>
            {error && (
              <span className="text-red-500">Something is missing</span>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AddEmployeeForm;
