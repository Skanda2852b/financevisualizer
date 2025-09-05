"use client";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  useState,
  useEffect,
} from "react";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF0080",
];

export default function CategoryPieChart({
  transactions,
  categories,
}) {
  const [
    chartData,
    setChartData,
  ] = useState([]);
  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  useEffect(() => {
    if (
      transactions &&
      Array.isArray(
        transactions
      )
    ) {
      processChartData();
    }
  }, [
    transactions,
    categories,
  ]);

  const processChartData =
    () => {
      if (
        !transactions ||
        !Array.isArray(
          transactions
        ) ||
        transactions.length ===
          0
      ) {
        setChartData([]);
        setIsLoading(false);
        return;
      }

      // Process data for the pie chart: category-wise expenses
      const categoryMap = {};

      // First, add all categories from the categories prop
      if (
        categories &&
        Array.isArray(
          categories
        )
      ) {
        categories.forEach(
          (category) => {
            if (
              category &&
              category._id
            ) {
              categoryMap[
                category._id
              ] = {
                name: category.name,
                color:
                  category.color,
                value: 0,
              };
            }
          }
        );
      }

      // Add uncategorized
      categoryMap.uncategorized =
        {
          name: "Uncategorized",
          color: "#cccccc",
          value: 0,
        };

      // Process transactions
      transactions
        .filter(
          (t) =>
            t &&
            t.type ===
              "expense"
        )
        .forEach(
          (transaction) => {
            const categoryId =
              transaction
                .category
                ?._id ||
              "uncategorized";
            const amount =
              Math.abs(
                transaction.amount ||
                  0
              );

            if (
              categoryMap[
                categoryId
              ]
            ) {
              categoryMap[
                categoryId
              ].value +=
                amount;
            } else {
              // If category doesn't exist in our map, add it
              categoryMap[
                categoryId
              ] = {
                name:
                  transaction
                    .category
                    ?.name ||
                  "Uncategorized",
                color:
                  transaction
                    .category
                    ?.color ||
                  "#cccccc",
                value: amount,
              };
            }
          }
        );

      // Convert to array and filter out zero values
      const data =
        Object.values(
          categoryMap
        ).filter(
          (item) =>
            item.value > 0
        );
      setChartData(data);
      setIsLoading(false);
    };

  // Add debug logging
  useEffect(() => {
    console.log(
      "CategoryPieChart props:",
      {
        transactions,
        categories,
      }
    );
    console.log(
      "Chart data:",
      chartData
    );
  }, [
    transactions,
    categories,
    chartData,
  ]);

  if (isLoading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="h-64 flex items-center justify-center text-gray-500">
          Loading...
        </div>
      </div>
    );
  }

  if (
    !transactions ||
    !Array.isArray(
      transactions
    ) ||
    transactions.length === 0
  ) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="h-64 flex items-center justify-center text-gray-500">
          No transaction data
          available
        </div>
      </div>
    );
  }

  if (
    chartData.length === 0
  ) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="h-64 flex items-center justify-center text-gray-500">
          No expense data
          available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="h-64">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={
                false
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({
                name,
                percent,
              }) =>
                `${name} (${(
                  percent *
                  100
                ).toFixed(
                  0
                )}%)`
              }
            >
              {chartData.map(
                (
                  entry,
                  index
                ) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.color ||
                      COLORS[
                        index %
                          COLORS.length
                      ]
                    }
                  />
                )
              )}
            </Pie>
            <Tooltip
              formatter={(
                value
              ) => [
                `$${parseFloat(
                  value
                ).toFixed(
                  2
                )}`,
                "Amount",
              ]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
