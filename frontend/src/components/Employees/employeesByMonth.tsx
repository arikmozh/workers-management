import { Employee } from "@/redux/interface";
import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// interface Employee {
//   _id: string;
//   userId: string;
//   departmentId: string;
//   startingDate: string; // or Date, depending on your implementation
//   employeeName: string;
//   employeeAge: string;
//   employeeContact: string;
//   employeeSalaryPerHour: number;
// }
interface OrganizedData {
  [month: number]: { [day: number]: number };
}

interface MonthLabel {
  value: number;
  label: string;
}

interface OverviewProps {
  employeesData: Employee[];
}

const organizeData = (data: Employee[]): OrganizedData => {
  const organizedData: OrganizedData = {};

  data.forEach((employee) => {
    const date = new Date(employee.startingDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if (!organizedData[month]) {
      organizedData[month] = {};
    }

    if (!organizedData[month][day]) {
      organizedData[month][day] = 0;
    }

    organizedData[month][day]++;
  });

  return organizedData;
};

const generateMonthLabels = (): MonthLabel[] => {
  return Array.from({ length: 12 }, (_, index) => ({
    value: index + 1,
    label: new Date(2023, index, 1).toLocaleDateString("en-US", {
      month: "short",
    }),
  }));
};

export function EmployeesByMonth({ employeesData }: OverviewProps) {
  const organizedData = organizeData(employeesData);
  const monthLabels = generateMonthLabels();
  const chartData = monthLabels.map(({ value }) => ({
    month: value,
    count: organizedData[value]
      ? Object.values(organizedData[value]).reduce((a, b) => a + b, 0)
      : 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          // tickFormatter={(value) => `${value}`}
        />
        {/* <Tooltip
          formatter={(value) => `${value}`}
          contentStyle={{
            background: "transparent",
            border: "none",
          }} // Set the background to transparent
        /> */}
        <Tooltip
          contentStyle={{
            background: "transparent",
            border: "none",
            outline: "none", // Remove box shadow
          }}
          labelFormatter={() => ""} // Disable the default label
          // formatter={(value) => (
          //   <span style={{ color: "violet" }}>{value}</span>
          // )} // Set the count color to violet
        />

        <Bar
          dataKey="count"
          fill="#adfa1d"
          radius={[4, 4, 0, 0]}
          cursor="pointer" // Set the cursor to pointer
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
