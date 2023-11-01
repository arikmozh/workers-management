import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
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

interface DataTableProps {
  filterSearch: string;
}

const DataTable: React.FC<DataTableProps> = ({ filterSearch }) => {
  // const store = useSelector((state: RootState) => state);
  const departments = useSelector((state: RootState) => state.data);
  const [filteredDepartments, setFilteredDepartments] = useState(departments);
  const [editingIndex, setEditingIndex] = useState(-1); // Index of the department being edited

  useEffect(() => {
    const filteredDepartments = departments.filter((department) =>
      department.departmentName
        .toLowerCase()
        .includes(filterSearch.toLowerCase())
    );

    setFilteredDepartments(filteredDepartments);

    console.log(filteredDepartments);

    console.log(departments);
    console.log(filterSearch);
  }, [filterSearch, departments]);

  const getTotalEmployees = (index: number) => {
    let count = 0;
    departments[index].shiftsInThisDepartment.map((shift) => {
      count += shift.employees.length;
    });
    return count;
  };

  return (
    <Table>
      {/* <TableCaption>A list of your departments.</TableCaption> */}
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
                      className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 hover:text-violet-600 cursor-pointer"
                      onClick={() => setEditingIndex(index)}
                    />
                    <Pencil
                      className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hover:text-violet-600 cursor-pointer"
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
                  <Input className="w-20" value={dep.departmentName} />

                  <Check
                    className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 hover:text-violet-600 cursor-pointer"
                    onClick={() => {
                      setEditingIndex(-1);
                    }}
                  />
                  <Check
                    className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hover:text-violet-600 cursor-pointer"
                    onClick={() => {
                      setEditingIndex(-1);
                    }}
                  />
                </div>
              ) : (
                <span className=" text-center  ">{dep.departmentName}</span>

                // <TooltipProvider>
                //   <Tooltip>
                //     <TooltipTrigger>
                //       <div className="flex text-center space-x-4 cursor-auto">
                //         {dep.departmentName}
                //       </div>
                //     </TooltipTrigger>
                //     <TooltipContent>
                //       <p>Edit department name</p>
                //     </TooltipContent>
                //   </Tooltip>
                // </TooltipProvider>
              )}
            </TableCell>
            <TableCell>
              {dep.shiftsInThisDepartment.map((shift, index) => {
                return (
                  <Badge className="cursor-pointer" key={index}>
                    {shift.shiftName}
                  </Badge>
                );
              })}
            </TableCell>
            <TableCell>{getTotalEmployees(index)}</TableCell>
            <TableCell className="text-right">
              {/* <Button
                variant="outline"
                className="hover:bg-primary/90 hover:text-primary-foreground text-primary"
              >
                x
              </Button> */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button variant="ghost" size="icon">
                      <X className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 hover:text-violet-600" />
                      <X className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hover:text-violet-600 " />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete department</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
          </TableRow>
        ))}
        {/* <TableRow>
          <TableCell className="text-right"></TableCell>
          <TableCell className="text-right"></TableCell>
          <TableCell className="text-right"></TableCell>
          <TableCell className="text-right">
            <Button>Add department</Button>
          </TableCell>
        </TableRow> */}
      </TableBody>
    </Table>
  );
};

export default DataTable;
