"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select } from "./ui/select";

export default function TransactionForm({
  categories,
  onSubmit,
  editingTransaction,
}) {
  const [
    formData,
    setFormData,
  ] = useState(
    editingTransaction || {
      amount: "",
      date: new Date()
        .toISOString()
        .split("T")[0],
      description: "",
      type: "expense",
      category: "",
    }
  );

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    // Validation
    if (
      !formData.amount ||
      !formData.description
    ) {
      alert(
        "Amount and description are required"
      );
      return;
    }

    await onSubmit(formData);

    if (!editingTransaction) {
      setFormData({
        amount: "",
        date: new Date()
          .toISOString()
          .split("T")[0],
        description: "",
        type: "expense",
        category: "",
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        {editingTransaction
          ? "Edit Transaction"
          : "Add New Transaction"}
      </h2>

      <form
        onSubmit={
          handleSubmit
        }
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Type
            </label>
            <Select
              value={
                formData.type
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e
                    .target
                    .value,
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="expense">
                Expense
              </option>
              <option value="income">
                Income
              </option>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Category
            </label>
            <Select
              value={
                formData.category
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category:
                    e.target
                      .value,
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">
                Select
                Category
              </option>
              {categories
                .filter(
                  (cat) =>
                    cat.type ===
                    formData.type
                )
                .map(
                  (
                    category
                  ) => (
                    <option
                      key={
                        category._id
                      }
                      value={
                        category._id
                      }
                    >
                      {
                        category.name
                      }
                    </option>
                  )
                )}
            </Select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Amount
          </label>
          <Input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={
              formData.amount
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                amount:
                  e.target
                    .value,
              })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Date
          </label>
          <Input
            type="date"
            value={
              formData.date
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                date: e.target
                  .value,
              })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Description
          </label>
          <Input
            placeholder="Enter a description for this transaction"
            value={
              formData.description
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                description:
                  e.target
                    .value,
              })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full py-3.5 text-base font-medium"
        >
          {editingTransaction
            ? "Update Transaction"
            : "Add Transaction"}
        </Button>
      </form>
    </div>
  );
}
