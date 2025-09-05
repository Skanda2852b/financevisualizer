"use client";
import { formatCurrency } from "../lib/utils";

export default function SummaryCards({
  transactions,
}) {
  const totalIncome =
    transactions
      .filter(
        (t) =>
          t.type === "income"
      )
      .reduce(
        (sum, t) =>
          sum + t.amount,
        0
      );

  const totalExpenses =
    transactions
      .filter(
        (t) =>
          t.type === "expense"
      )
      .reduce(
        (sum, t) =>
          sum + t.amount,
        0
      );

  const netAmount =
    totalIncome -
    totalExpenses;

  const recentTransactions =
    transactions.slice(0, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Income Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold text-gray-700">
            Total Income
          </h3>
          <div className="p-2 bg-green-100 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-600"
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
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </div>
        </div>
        <p className="text-3xl font-bold text-green-600 mb-1">
          {formatCurrency(
            totalIncome
          )}
        </p>
        <div className="mt-5 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            {
              transactions.filter(
                (t) =>
                  t.type ===
                  "income"
              ).length
            }{" "}
            income
            transactions
          </p>
        </div>
      </div>

      {/* Expenses Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold text-gray-700">
            Total Expenses
          </h3>
          <div className="p-2 bg-red-100 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-600"
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
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </div>
        </div>
        <p className="text-3xl font-bold text-red-600 mb-1">
          {formatCurrency(
            totalExpenses
          )}
        </p>
        <div className="mt-5 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            {
              transactions.filter(
                (t) =>
                  t.type ===
                  "expense"
              ).length
            }{" "}
            expense
            transactions
          </p>
        </div>
      </div>

      {/* Net Amount Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold text-gray-700">
            Net Amount
          </h3>
          <div
            className={`p-2 rounded-lg ${
              netAmount >= 0
                ? "bg-green-100"
                : "bg-red-100"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${
                netAmount >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
        </div>
        <p
          className={`text-3xl font-bold mb-1 ${
            netAmount >= 0
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {formatCurrency(
            netAmount
          )}
        </p>
        <div className="mt-5 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            {netAmount >= 0
              ? "Positive cash flow"
              : "Negative cash flow"}
          </p>
        </div>
      </div>

      {/* Recent Transactions Card */}
      <div className="md:col-span-3 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
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
                strokeWidth={
                  2
                }
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            Recent
            Transactions
          </h3>
          <span className="text-sm text-gray-500">
            Last{" "}
            {
              recentTransactions.length
            }{" "}
            transactions
          </span>
        </div>

        {recentTransactions.length ===
        0 ? (
          <div className="text-center py-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-gray-400 mb-3"
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p className="text-gray-500">
              No transactions
              yet.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentTransactions.map(
              (
                transaction
              ) => (
                <div
                  key={
                    transaction._id
                  }
                  className="py-5 flex justify-between items-center transition-colors hover:bg-gray-50 -mx-3 px-4 rounded-lg"
                >
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-4 flex-shrink-0"
                      style={{
                        backgroundColor:
                          transaction
                            .category
                            ?.color ||
                          "#ccc",
                      }}
                    ></div>
                    <div>
                      <p className="font-medium text-gray-900 mb-1">
                        {
                          transaction.description
                        }
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(
                          transaction.date
                        ).toLocaleDateString()}{" "}
                        •
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs ml-2">
                          {transaction
                            .category
                            ?.name ||
                            "Uncategorized"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-lg font-semibold ${
                      transaction.type ===
                      "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type ===
                    "income"
                      ? "+"
                      : "-"}
                    {formatCurrency(
                      Math.abs(
                        transaction.amount
                      )
                    )}
                  </span>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
