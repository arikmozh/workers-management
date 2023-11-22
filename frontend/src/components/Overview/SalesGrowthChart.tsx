import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const salesData = [
  { month: "Jan", sales: 10000 },
  { month: "Feb", sales: 15000 },
  { month: "Mar", sales: 20000 },
  { month: "Apr", sales: 25000 },
  // Add more data for each month
];

const SalesGrowthChart: React.FC = () => {
  // Assuming you have a variable that represents the growth for this month
  const growthThisMonth = 12234;

  // Calculate the sales for this month by adding growth to the last month's sales
  const lastMonthSales = salesData[salesData.length - 1].sales;
  const thisMonthSales = lastMonthSales + growthThisMonth;

  // Add the data point for this month
  const updatedSalesData = [
    ...salesData,
    { month: "Current Month", sales: thisMonthSales },
  ];

  return (
    <div style={{ width: "100%", height: 200, marginTop: "0.7rem" }}>
      <ResponsiveContainer>
        <LineChart
          width={500}
          height={300}
          data={updatedSalesData}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesGrowthChart;
