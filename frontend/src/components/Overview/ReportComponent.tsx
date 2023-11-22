import { dataDepartment } from "@/redux/interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ReportComponentProps {
  data: dataDepartment[];
}

const ReportComponent: React.FC<ReportComponentProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-4">
      {data.map((item) => {
        return (
          <Card key={item._id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 w-full ">
              <CardTitle
                className="text-2xl font-bold text-left 
              "
              >
                {item.departmentName}
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption className="">
                  A list of your recent shifts
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">shiftName</TableHead>
                    <TableHead>employees</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {item.shiftsInThisDepartment.map((shift) => (
                    <TableRow key={shift._id}>
                      <TableCell className="font-medium">
                        {shift.shiftName}
                      </TableCell>
                      <TableCell>{shift.employees.length} employees</TableCell>
                      <TableCell>{shift.shiftStartingHour}</TableCell>
                      <TableCell className="text-right">
                        {shift.shiftEndingHour}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">
                      {item.shiftsInThisDepartment.length} Shifts
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
              {/* </div> */}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ReportComponent;
