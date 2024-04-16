const getTotalSpendingByTypeLastMonth = async (userId, type, setError) => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/expense/total/type/${type}/month/${month}/year/${year}/user/${userId}`
  );
  const data = await response.json();

  if (data.message === "Error") {
    setError(`Error getting total spending by type last month: ${data.error}`);
    return 0;
  }

  const firstKey = Object.keys(data)[0];
  return data[firstKey] || 0;
};

const getTotalSpendingByType = async (userId, type, setError) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/expense/total/type/${type}/user/${userId}`
  );
  const data = await response.json();

  if (data.message === "Error") {
    setError(`Error getting total spending by type: ${data.error}`);
    return 0;
  }

  const firstKey = Object.keys(data)[0];
  return data[firstKey] || 0;
};

const getTotalSpendingLastMonth = async (
  userId,
  setTotalSpendingLastMonth,
  setError
) => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/expense/total/month/${month}/year/${year}/user/${userId}`
  );
  const data = await response.json();

  if (data.message === "Error") {
    setError(`Error getting total spending last month: ${data.error}`);
    setTotalSpendingLastMonth(0);
    return;
  }

  const firstKey = Object.keys(data)[0];
  setTotalSpendingLastMonth(data[firstKey] || 0);
};

const getTotalSpending = async (userId, setTotalSpending, setError) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/expense/total/user/${userId}`
  );
  const data = await response.json();

  if (data.message === "Error") {
    setError(`Error getting total spending: ${data.error}`);
    setTotalSpending(0);
    return;
  }

  const firstKey = Object.keys(data)[0];
  setTotalSpending(data[firstKey] || 0);
};

const createBudget = async (userId, expenseType, budget, setError) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/budget/user/${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: expenseType, budget }),
    }
  );
  const data = await response.json();

  if (data.message === "Error") {
    setError(`Error creating budget: ${data.error}`);
  }
  return data;
};

const createTransfer = async (userId, transferData, setError) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/bank/transfer/user/${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transferData),
    }
  );
  const data = await response.json();
  if (data.message === "Error") {
    setError(`Error creating transfer: ${data.error}`);
  }
  return data;
};

const getTransfers = async (userId, setTransfers, setError) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/bank/transfers/user/${userId}`
  );
  const data = await response.json();

  if (data.message === "Error") {
    setError(`Error getting transfers: ${data.error}`);
    setTransfers([]);
    return;
  }
  setTransfers(data);
};

const editBudget = async (userId, budgetType, amount, setError) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/budget/type/${budgetType}/user/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ budget: amount }),
    }
  );
  const data = await response.json();
  if (data.message === "Error") {
    setError(`Error editing budget: ${data.error}`);
  }
  return data;
};

const formatBudgetsByType = (budgets) => {
  const types = [
    "Housing",
    "Transportation",
    "Food",
    "Entertainment",
    "Personal Care",
  ];
  const budgetByType = {};
  types.forEach((type) => {
    const budget = budgets.find((budget) => budget.expense_type_name === type);
    if (budget) {
      budgetByType[type] = budget;
    } else {
      budgetByType[type] = { type, amount: 0 };
    }
  });
  return budgetByType;
};

const getBudgets = async (userId, setBudgets, setError) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/budget/user/${userId}`
  );
  const data = await response.json();

  if (data.message === "Error") {
    setError(`Error getting budgets: ${data.error}`);
    setBudgets({});
  }

  setBudgets(formatBudgetsByType(data));
};

const formatExpensesByDate = (expenses) => {
  const expensesByDate = {};
  expenses.forEach((expense) => {
    const date = new Date(expense.date);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const key = `${month}/${year}`;
    if (expensesByDate[key]) {
      expensesByDate[key].push(expense);
    } else {
      expensesByDate[key] = [expense];
    }
  });
  return expensesByDate;
};

const getExpenses = async (userId, setExpenses, setError) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/expense/user/${userId}`
  );
  const data = await response.json();

  if (data.message === "Error") {
    setError(`Error getting expenses: ${data.error}`);
    setExpenses([]);
    return;
  }
  setExpenses(formatExpensesByDate(data));
};

const editExpense = async (userId, expenseId, expenseData, setError) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/expense/${expenseId}/user/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseData),
    }
  );
  const data = await response.json();
  if (data.message === "Error") {
    setError(`Error editing expense: ${data.error}`);
  }
  return data;
};

const deleteExpense = async (userId, expenseId, setError) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/expense/${expenseId}/user/${userId}`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();
  if (data.message === "Error") {
    setError(`Error deleting expense: ${data.error}`);
  }
  return data;
};

const createExpense = async (userId, expenseData, setError) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/expense/user/${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseData),
    }
  );
  const data = await response.json();
  if (data.message === "Error") {
    setError(`Error creating expense: ${data.error}`);
  }
  return data;
};

const createHousingExpense = async (userId, expenseData, setError) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/expense/housing/user/${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseData),
    }
  );
  const data = await response.json();
  if (data.message === "Error") {
    setError(`Error creating housing expense: ${data.error}`);
  }
  return data;
};

const createTransportationExpense = async (userId, expenseData, setError) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/expense/transportation/user/${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseData),
    }
  );
  const data = await response.json();
  if (data.message === "Error") {
    setError(`Error creating transportation expense: ${data.error}`);
  }
  return data;
};

const createFoodExpense = async (userId, expenseData, setError) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/expense/food/user/${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseData),
    }
  );
  const data = await response.json();
  if (data.message === "Error") {
    setError(`Error creating food expense: ${data.error}`);
  }
  return data;
};

const createEntertainmentExpense = async (userId, expenseData, setError) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/expense/entertainment/user/${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseData),
    }
  );
  const data = await response.json();
  if (data.message === "Error") {
    setError(`Error creating entertainment expense: ${data.error}`);
  }
  return data;
};

const createPersonalCareExpense = async (userId, expenseData, setError) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/expense/personalCare/user/${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseData),
    }
  );
  const data = await response.json();
  if (data.message === "Error") {
    setError(`Error creating personal care expense: ${data.error}`);
  }
  return data;
};

const editHousingExpense = async (userId, expenseId, expenseData, setError) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/expense/housing/${expenseId}/user/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseData),
    }
  );
  const data = await response.json();
  if (data.message === "Error") {
    setError(`Error editing housing expense: ${data.error}`);
  }
  return data;
};

const editTransportationExpense = async (
  userId,
  expenseId,
  expenseData,
  setError
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/expense/transportation/${expenseId}/user/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseData),
    }
  );
  const data = await response.json();
  if (data.message === "Error") {
    setError(`Error editing transportation expense: ${data.error}`);
  }
  return data;
};

const editFoodExpense = async (userId, expenseId, expenseData, setError) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/expense/food/${expenseId}/user/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseData),
    }
  );
  const data = await response.json();
  if (data.message === "Error") {
    setError(`Error editing food expense: ${data.error}`);
  }
  return data;
};

const editEntertainmentExpense = async (
  userId,
  expenseId,
  expenseData,
  setError
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/expense/entertainment/${expenseId}/user/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseData),
    }
  );
  const data = await response.json();
  if (data.message === "Error") {
    setError(`Error editing entertainment expense: ${data.error}`);
  }
  return data;
};

const editPersonalCareExpense = async (
  userId,
  expenseId,
  expenseData,
  setError
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/expense/personalCare/${expenseId}/user/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseData),
    }
  );
  const data = await response.json();
  if (data.message === "Error") {
    setError(`Error editing personal care expense: ${data.error}`);
  }
  return data;
};

const getBankAccounts = async (userId, setBankAccounts, setError) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/bank/user/${userId}`
  );
  const data = await response.json();

  if (data.message === "Error") {
    setBankAccounts([]);
    setError(`Error getting bank accounts: ${data.error}`);
    return;
  }
  setBankAccounts(data);
};

const createBankAccount = async (userId, accountNum, balance, setError) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/bank/user/${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accountNum, balance }),
    }
  );
  const data = await response.json();
  if (data.message === "Error") {
    setError(`Error creating bank account: ${data.error}`);
  }
  return data;
};

const editBankAccount = async (userId, accountNum, balance, setError) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/bank/${accountNum}/user/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accountNum, balance }),
    }
  );
  const data = await response.json();
  if (data.message === "Error") {
    setError(`Error editing bank account: ${data.error}`);
  }
  return data;
};

const getTotalBankBalance = async (userId, setTotalBalance, setError) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/bank/balance/user/${userId}`
  );

  const data = await response.json();
  if (data.message === "Error") {
    setTotalBalance(0);
    setError(`Error getting total balance: ${data.error}`);
    return;
  }

  const firstKey = Object.keys(data)[0];
  setTotalBalance(data[firstKey] || 0);

  return data;
};

export {
  getBankAccounts,
  createBankAccount,
  editBankAccount,
  getExpenses,
  deleteExpense,
  createExpense,
  editExpense,
  getBudgets,
  editBudget,
  getTransfers,
  createTransfer,
  createBudget,
  getTotalSpending,
  getTotalSpendingLastMonth,
  getTotalSpendingByType,
  getTotalSpendingByTypeLastMonth,
  getTotalBankBalance,
  createHousingExpense,
  createTransportationExpense,
  createFoodExpense,
  createEntertainmentExpense,
  createPersonalCareExpense,
  editHousingExpense,
  editTransportationExpense,
  editFoodExpense,
  editEntertainmentExpense,
  editPersonalCareExpense,
};
