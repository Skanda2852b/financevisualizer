"use client";
import { useState } from "react";
import { Button } from "./ui/button";

export default function TransactionList({
  transactions,
  onEdit,
  onDelete,
}) {
  const [
    filterType,
    setFilterType,
  ] = useState("all");

  const filteredTransactions =
    transactions.filter(
      (transaction) => {
        if (
          filterType === "all"
        )
          return true;
        return (
          transaction.type ===
          filterType
        );
      }
    );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Transactions
        </h2>
        <div className="flex space-x-3">
          <Button
            variant={
              filterType ===
              "all"
                ? "default"
                : "outline"
            }
            className="rounded-full px-4"
            onClick={() =>
              setFilterType(
                "all"
              )
            }
          >
            All
          </Button>
          <Button
            variant={
              filterType ===
              "income"
                ? "default"
                : "outline"
            }
            className="rounded-full px-4"
            onClick={() =>
              setFilterType(
                "income"
              )
            }
          >
            Income
          </Button>
          <Button
            variant={
              filterType ===
              "expense"
                ? "default"
                : "outline"
            }
            className="rounded-full px-4"
            onClick={() =>
              setFilterType(
                "expense"
              )
            }
          >
            Expenses
          </Button>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {filteredTransactions.map(
          (transaction) => (
            <div
              key={
                transaction._id
              }
              className="p-5 flex justify-between items-center hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor:
                        transaction
                          .category
                          ?.color ||
                        "#ccc",
                    }}
                  ></div>
                  <span className="font-medium text-gray-900 truncate">
                    {
                      transaction.description
                    }
                  </span>
                </div>
                <div className="text-sm text-gray-500 flex flex-wrap gap-2">
                  <span>
                    {new Date(
                      transaction.date
                    ).toLocaleDateString()}
                  </span>
                  <span>
                    •
                  </span>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {transaction
                      .category
                      ?.name ||
                      "Uncategorized"}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-3 ml-4">
                <span
                  className={`text-base font-semibold ${
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
                  $
                  {Math.abs(
                    transaction.amount
                  ).toFixed(
                    2
                  )}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-2 text-sm rounded-lg border-gray-300 hover:bg-gray-100"
                  onClick={() =>
                    onEdit(
                      transaction
                    )
                  }
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="h-8 px-2 text-sm rounded-lg"
                  onClick={() =>
                    onDelete(
                      transaction._id
                    )
                  }
                >
                  Delete
                </Button>
              </div>
            </div>
          )
        )}

        {filteredTransactions.length ===
          0 && (
          <div className="p-12 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-400"
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
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No transactions
              found
            </h3>
            <p className="text-gray-500 text-sm">
              {filterType ===
              "all"
                ? "You don't have any transactions yet."
                : `You don't have any ${filterType} transactions.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
