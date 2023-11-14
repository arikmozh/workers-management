import React, { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Department, Employee } from "@/redux/interface";
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
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

interface AddEmployeeFormProps {
  departments: Department[];
  onAddEmployee: (employeeData: Employee) => void;
}

const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({
  departments,
  onAddEmployee,
}) => {
  return (
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
                // onValueChange={(selectedValue) => {
                //   setShift((prevShift) => ({
                //     ...prevShift,
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
                <Label htmlFor="width">Shift name:</Label>
                <Input
                  id="width"
                  placeholder="Enter name"
                  className="col-span-2 h-8"
                  // onChange={(e) => {
                  //   setShift({ ...shift, shiftName: e.target.value });
                  // }}
                />
              </div>
            </div>
            {/* <div className="grid gap-2">
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
            </div> */}
            {/* <div className="grid gap-2">
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
            </div> */}
            {/* {showEndHourSelect && startHour && (
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
            )} */}
            {/* <Button onClick={addShift}>Add</Button>
            {error && (
              <span className="text-red-500">Something is missing</span>
            )} */}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AddEmployeeForm;
