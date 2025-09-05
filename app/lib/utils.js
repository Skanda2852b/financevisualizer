export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString('en-US', { month: 'long' });
}

export function processMonthlyData(transactions) {
  if (!transactions || !Array.isArray(transactions)) return [];
  
  const monthlyData = {};
  
  transactions
    .filter(t => t && t.type === 'expense')
    .forEach(transaction => {
      if (!transaction.date) return;
      
      try {
        const date = new Date(transaction.date);
        if (isNaN(date.getTime())) return;
        
        const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        
        if (!monthlyData[monthYear]) {
          monthlyData[monthYear] = 0;
        }
        
        monthlyData[monthYear] += Math.abs(transaction.amount || 0);
      } catch (error) {
        console.error('Error processing transaction date:', error);
      }
    });
  
  return Object.entries(monthlyData)
    .map(([month, amount]) => ({
      month: month,
      amount: parseFloat(amount.toFixed(2)),
    }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

export function processCategoryData(transactions, categories) {
  if (!transactions || !Array.isArray(transactions)) return [];
  if (!categories || !Array.isArray(categories)) categories = [];
  
  const categoryMap = {};
  
  // Initialize all categories
  categories.forEach(category => {
    if (category && category._id) {
      categoryMap[category._id] = {
        name: category.name,
        color: category.color,
        value: 0,
      };
    }
  });
  
  // Add uncategorized
  categoryMap.uncategorized = {
    name: 'Uncategorized',
    color: '#cccccc',
    value: 0,
  };
  
  // Calculate category totals
  transactions
    .filter(t => t && t.type === 'expense')
    .forEach(transaction => {
      const categoryId = (transaction.category && transaction.category._id) || 'uncategorized';
      if (categoryMap[categoryId]) {
        categoryMap[categoryId].value += Math.abs(transaction.amount || 0);
      } else {
        categoryMap.uncategorized.value += Math.abs(transaction.amount || 0);
      }
    });
  
  // Filter out categories with zero value
  return Object.values(categoryMap).filter(item => item && item.value > 0);
}