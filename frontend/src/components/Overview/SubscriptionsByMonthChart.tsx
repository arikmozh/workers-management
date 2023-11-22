import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const subscriptionData = [
  {
    month: "Jan",
    newSubscriptions: 500,
    canceledSubscriptions: 200,
    totalSubscriptions: 300,
  },
  {
    month: "Feb",
    newSubscriptions: 600,
    canceledSubscriptions: 100,
    totalSubscriptions: 500,
  },
  {
    month: "Mar",
    newSubscriptions: 700,
    canceledSubscriptions: 150,
    totalSubscriptions: 550,
  },
  // Add more data for each month
];

const SubscriptionsByMonthChart: React.FC = () => {
  return (
    <div style={{ width: "100%", height: 200, marginTop: "0.7rem" }}>
      <ResponsiveContainer>
        <ComposedChart
          width={200}
          height={200}
          data={subscriptionData}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="month" scale="band" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Bar
            dataKey="newSubscriptions"
            barSize={20}
            fill="#413ea0"
            stackId="stack"
          />
          <Bar
            dataKey="canceledSubscriptions"
            barSize={20}
            fill="#ff7300"
            stackId="stack"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SubscriptionsByMonthChart;
