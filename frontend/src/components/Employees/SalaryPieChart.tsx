import { Employee } from "@/redux/interface";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

interface SalaryPieChartProps {
  data: Employee[];
}

const SalaryPieChart: React.FC<SalaryPieChartProps> = ({ data }) => {
  // Extract relevant data for the pie chart (e.g., employeeSalaryPerHour)
  const [employeesOver50, setEmployeesOver50] = useState<number>(0);
  const [employeesPayingLess, setEmployeesPayingLess] = useState<number>(0);

  useEffect(() => {
    console.log(data);

    // Analyze data to count employees over 50 and those paying less than a certain amount
    const over50Count = data.filter(
      (employee) => employee.employeeSalaryPerHour === 50
    ).length;
    console.log(over50Count);

    const payingLessCount = data.filter(
      (employee) => employee.employeeSalaryPerHour === 35
    ).length;

    setEmployeesOver50(over50Count);
    setEmployeesPayingLess(payingLessCount);
  }, [data]);

  const chartData = [
    { name: "Managers", value: employeesOver50 },
    { name: "New Employees", value: employeesPayingLess },
  ];

  // Define colors for the pie chart slices
  const COLORS = ["#0088FE", "#00C49F"];

  return (
    <div>
      <PieChart width={200} height={200}>
        <Pie
          data={chartData}
          cx={100}
          cy={100}
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default SalaryPieChart;
