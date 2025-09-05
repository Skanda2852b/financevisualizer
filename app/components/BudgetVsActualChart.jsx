"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function BudgetVsActualChart({
  transactions,
}) {
  // This is a placeholder. You would need to fetch budgets and compare with actual expenses.
  const data = [
    {
      name: "Jan",
      budget: 4000,
      actual: 2400,
    },
    {
      name: "Feb",
      budget: 3000,
      actual: 1398,
    },
    {
      name: "Mar",
      budget: 2000,
      actual: 9800,
    },
    {
      name: "Apr",
      budget: 2780,
      actual: 3908,
    },
    {
      name: "May",
      budget: 1890,
      actual: 4800,
    },
    {
      name: "Jun",
      budget: 2390,
      actual: 3800,
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">
        Budget vs Actual
      </h2>
      <div className="h-64">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={data}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="budget"
              fill="#8884d8"
            />
            <Bar
              dataKey="actual"
              fill="#82ca9d"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
