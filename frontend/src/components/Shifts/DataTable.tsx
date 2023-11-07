import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { RootState, Shift } from "@/redux/interface";
import { Button } from "../ui/button";
// import { Badge } from "@/components/ui/badge";
import { Input } from "../ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, Pencil, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { deleteShiftToAPI, updateShiftToAPI } from "../../utils/workersUtils";
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { doDeleteShift, doUpdateShift } from "../../redux/actions";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

interface DataTableProps {
  filterSearch: string;
}

const DataTable: React.FC<DataTableProps> = ({ filterSearch }) => {
  // const store = useSelector((state: RootState) => state);
  const departments = useSelector((state: RootState) => state.departments);
  const shifts = useSelector((state: RootState) => state.shifts);
  const [filteredShifts, setFilteredShifts] = useState(shifts);
  const [editingIndex, setEditingIndex] = useState(-1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleShiftNameChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const updatedShifts = [...filteredShifts];
    updatedShifts[index] = {
      ...updatedShifts[index],
      shiftName: e.target.value,
    };
    setFilteredShifts(updatedShifts);
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

  const handleShiftStartingHourChange = (
    selectedValue: string,
    index: number
  ) => {
    const updatedShifts = [...filteredShifts];
    const start = updatedShifts[index].shiftStartingHour;
    const end = updatedShifts[index].shiftEndingHour;
    const diff = calculateTimeDifference(start, end);
    console.log(diff);
    const added = addTimeDifference(selectedValue, diff);
    console.log(added);

    updatedShifts[index] = {
      ...updatedShifts[index],
      shiftStartingHour: selectedValue,
      shiftEndingHour: added,
    };
    setFilteredShifts(updatedShifts);
  };

  function calculateTimeDifference(startHour: string, endHour: string) {
    const [startHH, startMM] = startHour.split(":").map(Number);
    const [endHH, endMM] = endHour.split(":").map(Number);

    const startInMinutes = startHH * 60 + startMM;
    const endInMinutes = endHH * 60 + endMM;

    // Calculate the time difference in minutes
    const diffInMinutes = endInMinutes - startInMinutes;

    // Convert the difference back to hours and minutes
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }

  const addTimeDifference = (
    startHour: string,
    timeDifference: string
  ): string => {
    const [startHH, startMM] = startHour.split(":").map(Number);
    const [diffHH, diffMM] = timeDifference.split(":").map(Number);

    let newHH = startHH + diffHH;
    let newMM = startMM + diffMM;

    if (newMM >= 60) {
      newHH += Math.floor(newMM / 60);
      newMM %= 60;
    }

    newHH %= 24; // To ensure the hour remains in 24-hour format

    return `${newHH.toString().padStart(2, "0")}:${newMM
      .toString()
      .padStart(2, "0")}`;
  };

  const updateShift = async (shiftId: string) => {
    console.log(shiftId);
    console.log(filteredShifts);

    try {
      const shift = filteredShifts.filter((s) => {
        return s._id === shiftId;
      });
      console.log(shift);

      const data = await updateShiftToAPI(shiftId, shift[0]);
      console.log(data);
      if (data) {
        dispatch(doUpdateShift(data));
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const deleteShift = async (
    shiftId: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault(); // Prevent the default button behavior

    try {
      const data = await deleteShiftToAPI(shiftId);
      console.log(data);
      if (data) {
        dispatch(doDeleteShift(data));
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  useEffect(() => {
    const filteredShifts = shifts.filter((shift) =>
      shift.shiftName.toLowerCase().includes(filterSearch.toLowerCase())
    );
    setFilteredShifts(filteredShifts);
  }, [filterSearch, shifts, departments]);

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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left"></TableHead>
          <TableHead className="text-center">Department</TableHead>
          <TableHead className="w-[140px] text-center">Name</TableHead>
          <TableHead className="w-[140px] text-center">Date</TableHead>
          <TableHead className="w-[140px] text-center">Start</TableHead>
          <TableHead className="w-[140px] text-center">End</TableHead>
          <TableHead className="text-center">Employees</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredShifts.map((shift: Shift, index) => (
          <TableRow key={index}>
            <TableCell className="">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Pencil
                      className="dark:hidden h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 hover:text-violet-600 cursor-pointer"
                      onClick={() => setEditingIndex(index)}
                    />
                    <Pencil
                      className="hidden dark:block h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hover:text-violet-600 cursor-pointer"
                      onClick={() => setEditingIndex(index)}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit department name</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell className="text-center">
              {getDepartmentName(shift.departmentId)}
            </TableCell>
            <TableCell className="font-medium">
              {editingIndex === index ? ( // If currently editing this department
                <div className="flex justify-between items-center ">
                  <Input
                    className=""
                    value={filteredShifts[index].shiftName}
                    onChange={(e) => {
                      handleShiftNameChange(index, e);
                    }}
                  />

                  <Check
                    className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 hover:text-violet-600 cursor-pointer"
                    onClick={() => {
                      setEditingIndex(-1);
                      updateShift(shift._id);
                    }}
                  />
                  <Check
                    className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hover:text-violet-600 cursor-pointer"
                    onClick={() => {
                      setEditingIndex(-1);
                      updateShift(shift._id);
                    }}
                  />
                </div>
              ) : (
                <span className=" text-center  ">
                  <Badge
                    className="cursor-pointer"
                    key={index}
                    onClick={() => {
                      navigate(shift._id);
                    }}
                  >
                    {shift.shiftName}
                  </Badge>
                </span>
              )}
            </TableCell>
            <TableCell>{getShiftDate(shift.shiftDate)}</TableCell>
            <TableCell>
              {editingIndex === index ? ( // If currently editing this department
                <div className="flex justify-between items-center ">
                  {/* <Input
                    className=""
                    value={filteredShifts[index].shiftStartingHour}
                    onChange={(e) => {
                      handleShiftStartingHourChange(index, e);
                    }}
                  /> */}
                  <Select
                    onValueChange={(value) =>
                      handleShiftStartingHourChange(value, index)
                    }
                    value={shift.shiftStartingHour}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select hour" />
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
                  </Select>

                  <Check
                    className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 hover:text-violet-600 cursor-pointer"
                    onClick={() => {
                      setEditingIndex(-1);
                      updateShift(shift._id);
                    }}
                  />
                  <Check
                    className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hover:text-violet-600 cursor-pointer"
                    onClick={() => {
                      setEditingIndex(-1);
                      updateShift(shift._id);
                    }}
                  />
                </div>
              ) : (
                <span className=" text-center  ">
                  {shift.shiftStartingHour}
                </span>
              )}
            </TableCell>
            <TableCell>{shift.shiftEndingHour}</TableCell>
            <TableCell>{shift.shiftEmployees.length}</TableCell>
            <TableCell className="text-right">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Dialog>
                      <DialogTrigger>
                        <Button variant="ghost" size="icon">
                          <X className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 hover:text-violet-600" />
                          <X className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hover:text-violet-600 " />
                          <span className="sr-only">Toggle theme</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Are you sure you want to delete this shift?
                          </DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete{" "}
                            <span className="text-violet-600 font-semibold">
                              {shift.shiftName}
                            </span>{" "}
                            and remove your data from our servers.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            type="submit"
                            onClick={(e) => deleteShift(shift._id, e)}
                          >
                            Save changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete shift</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
          </TableRow>
        ))}
        {/* {filteredShifts.map((shift: dataShift, index) => (
          <TableRow key={index}>
            <TableCell className="text-left">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Pencil
                      className="dark:hidden h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 hover:text-violet-600 cursor-pointer"
                      onClick={() => setEditingIndex(index)}
                    />
                    <Pencil
                      className="hidden dark:block h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hover:text-violet-600 cursor-pointer"
                      onClick={() => setEditingIndex(index)}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit department name</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell className="font-medium">
              {editingIndex === index ? ( // If currently editing this department
                <div className="flex justify-between items-center ">
                  <Input
                    className=""
                    value={filteredShifts[index].shiftName}
                    onChange={(e) => {
                      handleDepartmentNameChange(index, e);
                    }}
                  />

                  <Check
                    className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 hover:text-violet-600 cursor-pointer"
                    onClick={() => {
                      setEditingIndex(-1);
                      updateDepartment(dep._id, dep.departmentName);
                    }}
                  />
                  <Check
                    className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hover:text-violet-600 cursor-pointer"
                    onClick={() => {
                      setEditingIndex(-1);
                      updateDepartment(dep._id, dep.departmentName);
                    }}
                  />
                </div>
              ) : (
                <span className=" text-center  ">{shift.shiftName}</span>
              )}
            </TableCell>
            <TableCell>
              {shift.shiftsInThisDepartment.map((shift, index) => {
                return (
                  <Badge className="cursor-pointer" key={index}>
                    {shift.shiftName}
                  </Badge>
                );
              })}
            </TableCell>
            <TableCell>{getTotalEmployees(index)}</TableCell>
            <TableCell className="text-right">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Dialog>
                      <DialogTrigger>
                        <Button variant="ghost" size="icon">
                          <X className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 hover:text-violet-600" />
                          <X className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hover:text-violet-600 " />
                          <span className="sr-only">Toggle theme</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Are you sure you want to delete this department?
                          </DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete{" "}
                            <span className="text-violet-600 font-semibold">
                              {dep.departmentName}
                            </span>{" "}
                            and remove your data from our servers.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            type="submit"
                            onClick={(e) => deleteDepartment(dep._id, e)}
                          >
                            Save changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete department</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
          </TableRow>
        ))} */}
      </TableBody>
    </Table>
  );
};

export default DataTable;
