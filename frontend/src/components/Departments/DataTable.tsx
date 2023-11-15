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
import { RootState, dataDepartment } from "@/redux/interface";
import { Button } from "../ui/button";
import { Badge } from "@/components/ui/badge";
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
  updateDepartmentToAPI,
  deleteDepartmentToAPI,
} from "../../utils/workersUtils";
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { doUpdateDepartment, doDeleteDepartment } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../ui/card";

interface DataTableProps {
  filterSearch: string;
}

const DataTable: React.FC<DataTableProps> = ({ filterSearch }) => {
  // const store = useSelector((state: RootState) => state);
  const departments = useSelector((state: RootState) => state.data);
  const [filteredDepartments, setFilteredDepartments] = useState(departments);
  const [editingIndex, setEditingIndex] = useState(-1); // Index of the department being edited
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDepartmentNameChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const updatedDepartments = [...filteredDepartments];
    updatedDepartments[index] = {
      ...updatedDepartments[index],
      departmentName: e.target.value,
    };
    setFilteredDepartments(updatedDepartments);
  };

  const updateDepartment = async (depId: string, depName: string) => {
    try {
      const data = await updateDepartmentToAPI(depId, depName);
      console.log(data);
      if (data) {
        dispatch(doUpdateDepartment(data));
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const deleteDepartment = async (
    depId: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault(); // Prevent the default button behavior

    try {
      const data = await deleteDepartmentToAPI(depId);
      console.log(data);
      if (data) {
        dispatch(doDeleteDepartment(data));
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  useEffect(() => {
    const filteredDepartments = departments.filter((department) =>
      department.departmentName
        .toLowerCase()
        .includes(filterSearch.toLowerCase())
    );

    setFilteredDepartments(filteredDepartments);
  }, [filterSearch, departments]);

  // const getTotalEmployees = (index: number) => {
  //   let count = 0;

  //   if (
  //     departments[index]?.shiftsInThisDepartment &&
  //     Array.isArray(departments[index].shiftsInThisDepartment)
  //   ) {
  //     departments[index].shiftsInThisDepartment.map((shift) => {
  //       count += shift.employees.length;
  //     });
  //   }

  //   return count;
  // };

  const getTotalEmployees = (index: number) => {
    console.log(departments[index]); // Check the value of departments[index]
    let count = 0;

    if (
      departments[index]?.shiftsInThisDepartment &&
      Array.isArray(departments[index].shiftsInThisDepartment)
    ) {
      departments[index].shiftsInThisDepartment.map((shift) => {
        if (shift.employees && shift.employees.length > 0) {
          count += shift.employees.length;
        }
      });
    }

    return count;
  };

  return (
    <Card>
      <CardContent className="pl-2 pr-2 overflow-auto max-h-[350px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left"></TableHead>
              <TableHead className="w-[140px] text-center">Name</TableHead>
              <TableHead className="text-center">Shifts</TableHead>
              <TableHead className="text-center">Employees</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDepartments.map((dep: dataDepartment, index) => (
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
                        value={filteredDepartments[index].departmentName}
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
                    <span className=" text-center  ">{dep.departmentName}</span>
                  )}
                </TableCell>
                <TableCell>
                  {dep.shiftsInThisDepartment.map((shift, index) => {
                    return (
                      <Badge
                        className="cursor-pointer"
                        key={index}
                        onClick={() =>
                          navigate(`/dashboard/shifts/${shift._id}`)
                        }
                      >
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
                            <div
                              className="flex justify-between items-center"
                              onClick={() => {
                                // Handle button click logic here
                              }}
                            >
                              <X
                                className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 hover:text-violet-600 cursor-pointer"
                                onClick={() => {
                                  // setEditingIndex(-1);
                                  // updateDepartment(dep._id, dep.departmentName);
                                }}
                              />
                              <X
                                className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hover:text-violet-600 cursor-pointer"
                                onClick={() => {
                                  // setEditingIndex(-1);
                                  // updateDepartment(dep._id, dep.departmentName);
                                }}
                              />

                              {/* <X
                            className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-[-90deg] dark:scale-0 hover:text-violet-600 cursor-pointer`}
                          />
                          <X className="hidden dark:block h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hover:text-violet-600 cursor-pointer" /> */}
                              {/* <span className="sr-only">Toggle theme</span> */}
                            </div>

                            {/* <Button variant="ghost" size="icon">
                          <X className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 hover:text-violet-600" />
                          <X className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hover:text-violet-600 " />
                          <span className="sr-only">Toggle theme</span>
                        </Button> */}
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Are you sure you want to delete this department?
                              </DialogTitle>
                              <DialogDescription>
                                This action cannot be undone. This will
                                permanently delete{" "}
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
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DataTable;
