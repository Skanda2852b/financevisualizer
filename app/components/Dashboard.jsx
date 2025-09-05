// app/components/Dashboard.jsx
"use client";
import SummaryCards from "./SummaryCards";
import MonthlyExpensesChart from "./MonthlyExpensesChart";
import CategoryPieChart from "./CategoryPieChart";
import BudgetVsActualChart from "./BudgetVsActualChart";
import { processMonthlyData } from "../lib/utils";

export default function Dashboard({
  transactions,
  categories,
}) {
  const monthlyData =
    processMonthlyData(
      transactions
    );

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Financial Dashboard
        </h1>
        <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg">
          Last updated:{" "}
          {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Financial Overview
        </h2>
        <SummaryCards
          transactions={
            transactions
          }
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Expenses Chart */}
        <div className="bg-white rounded-xl shadow-sm p-7 border border-gray-100">
          <div className="flex items-center justify-between mb-7">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={
                    2
                  }
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                />
              </svg>
              Monthly Expenses
            </h3>
            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
              Last 12 months
            </span>
          </div>
          <div className="h-80">
            <MonthlyExpensesChart
              data={
                monthlyData
              }
            />
          </div>
        </div>

        {/* Category Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm p-7 border border-gray-100">
          <div className="flex items-center justify-between mb-7">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={
                    2
                  }
                  d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={
                    2
                  }
                  d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                />
              </svg>
              Spending by
              Category
            </h3>
            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
              {
                categories.length
              }{" "}
              categories
            </span>
          </div>
          <div className="h-80">
            <CategoryPieChart
              transactions={
                transactions
              }
              categories={
                categories
              }
            />
          </div>
        </div>
      </div>

      {/* Budget vs Actual Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Budget vs Actual
        </h3>
        <div className="h-80">
          <BudgetVsActualChart
            transactions={
              transactions
            }
          />
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="bg-blue-50 rounded-xl shadow-sm p-6 border border-blue-100">
        <h3 className="text-lg font-semibold text-blue-800 mb-5">
          Quick Stats
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="text-center p-5 bg-white rounded-lg shadow-xs border border-gray-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {
                transactions.filter(
                  (t) =>
                    t.type ===
                    "income"
                ).length
              }
            </div>
            <div className="text-sm text-gray-600">
              Income
              Transactions
            </div>
          </div>
          <div className="text-center p-5 bg-white rounded-lg shadow-xs border border-gray-100">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {
                transactions.filter(
                  (t) =>
                    t.type ===
                    "expense"
                ).length
              }
            </div>
            <div className="text-sm text-gray-600">
              Expense
              Transactions
            </div>
          </div>
          <div className="text-center p-5 bg-white rounded-lg shadow-xs border border-gray-100">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {
                categories.length
              }
            </div>
            <div className="text-sm text-gray-600">
              Categories
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
