import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
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
          <TableHead className="w-[140px] text-center">Name</TableHead>
          <TableHead className="text-center">Shifts</TableHead>
          <TableHead className="text-center">Employees</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredDepartments.map((dep: dataDepartment, index) => (
          <TableRow key={index}>
            {/* <TableCell className="font-medium cursor-pointer">
              <span>{dep.departmentName}</span>
              <Input></Input>
            </TableCell> */}
            <TableCell className="font-medium cursor-pointer">
              {editingIndex === index ? ( // If currently editing this department
                <div className="flex items-center">
                  <Input className="" value={dep.departmentName} />
                  <button
                    onClick={() => {
                      // Update the department name and exit edit mode
                      // Save the updated value to your store or perform an action to save it
                      setEditingIndex(-1);
                    }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                // <span
                //   onClick={() => setEditingIndex(index)} // Enable edit mode when clicked
                // >
                //   {dep.departmentName}
                // </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger onClick={() => setEditingIndex(index)}>
                      {dep.departmentName}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit department name</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </TableCell>
            <TableCell>
              {dep.shiftsInThisDepartment.map((shift) => {
                return (
                  <Badge className="cursor-pointer">{shift.shiftName}</Badge>
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
                    <Button
                      variant="outline"
                      className="hover:bg-primary/90 hover:text-primary-foreground text-primary"
                    >
                      x
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
