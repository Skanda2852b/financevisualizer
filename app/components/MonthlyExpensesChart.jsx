// app/components/MonthlyExpensesChart.jsx
"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { processMonthlyData } from "../lib/utils";

export default function MonthlyExpensesChart({
  data,
  transactions,
}) {
  // If transactions are provided instead of processed data, process them
  const chartData =
    transactions
      ? processMonthlyData(
          transactions
        )
      : data;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="h-64">
        {chartData &&
        chartData.length >
          0 ? (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={chartData}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(
                  value
                ) => [
                  `$${value}`,
                  "Amount",
                ]}
              />
              <Bar
                dataKey="amount"
                fill="#8884d8"
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            No expense data
            available
          </div>
        )}
      </div>
    </div>
  );
}
