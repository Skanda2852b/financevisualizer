'use client';
import { useState, useEffect } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import MonthlyExpensesChart from './components/MonthlyExpensesChart';
import CategoryPieChart from './components/CategoryPieChart';
import SummaryCards from './components/SummaryCards';
import Dashboard from './components/Dashboard';
import { processMonthlyData } from './lib/utils';

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [transRes, catRes] = await Promise.all([
        fetch('/api/transactions'),
        fetch('/api/categories')
      ]);
      
      if (transRes.ok && catRes.ok) {
        const transactions = await transRes.json();
        const categories = await catRes.json();
        setTransactions(transactions);
        setCategories(categories);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddTransaction = async (formData) => {
    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        fetchData();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to add transaction');
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert('Failed to add transaction');
    }
  };

  const handleEditTransaction = async (formData) => {
    try {
      const response = await fetch(`/api/transactions/${editingTransaction._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        fetchData();
        setEditingTransaction(null);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to update transaction');
      }
    } catch (error) {
      console.error('Error updating transaction:', error);
      alert('Failed to update transaction');
    }
  };

  const handleDeleteTransaction = async (id) => {
    if (!confirm('Are you sure you want to delete this transaction?')) return;
    
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        fetchData();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete transaction');
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
      alert('Failed to delete transaction');
    }
  };

  const monthlyData = processMonthlyData(transactions);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Personal Finance Tracker
            </h1>
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'dashboard' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('transactions')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'transactions' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Transactions
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {activeTab === 'dashboard' && (
          <Dashboard transactions={transactions} categories={categories} />
        )}

        {activeTab === 'transactions' && (
          <div className="space-y-8">
            {/* Form and Transaction List Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <TransactionForm 
                    categories={categories} 
                    onSubmit={editingTransaction ? handleEditTransaction : handleAddTransaction}
                    editingTransaction={editingTransaction}
                  />
                  {editingTransaction && (
                    <button
                      onClick={() => setEditingTransaction(null)}
                      className="mt-6 w-full py-2.5 text-sm text-gray-600 hover:text-gray-800 transition-colors border border-gray-200 rounded-md hover:bg-gray-50"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <TransactionList 
                    transactions={transactions} 
                    onEdit={setEditingTransaction}
                    onDelete={handleDeleteTransaction}
                  />
                </div>
              </div>
            </div>
            
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
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
                        strokeWidth={2}
                        d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                      />
                    </svg>
                    Monthly Expenses
                  </h3>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                    Last 12 months
                  </span>
                </div>
                <div className="h-80">
                  <MonthlyExpensesChart data={monthlyData} />
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
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
                        strokeWidth={2}
                        d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                      />
                    </svg>
                    Spending by Category
                  </h3>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                    {categories.length} categories
                  </span>
                </div>
                <div className="h-80">
                  <CategoryPieChart transactions={transactions} categories={categories} />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-12 py-6 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Personal Finance Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}