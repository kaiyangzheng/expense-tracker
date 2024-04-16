import React from "react";
import { useState, useEffect } from "react";
import {
  getBankAccounts,
  getExpenses,
  getBudgets,
  getTransfers,
  getTotalSpending,
  getTotalSpendingLastMonth,
  getTotalSpendingByType,
  getTotalSpendingByTypeLastMonth,
  getTotalBankBalance,
} from "@/utils/expenseDBUtils";
import BankAccounts from "./BankAccounts";
import Expenses from "./Expenses";
import BudgetOverview from "./BudgetOverview";
import Transfers from "./Transfers";

import { Stack, Text, Button, HStack } from "@chakra-ui/react";

const Home = ({ userId, username, handleLogout, setError }) => {
  const [view, setView] = useState("budget");

  const [bankAccounts, setBankAccounts] = useState([]);
  const [expenses, setExpenses] = useState({});
  const [budgets, setBudgets] = useState({});
  const [transfers, setTransfers] = useState([]);
  const [totalSpending, setTotalSpending] = useState(0);
  const [totalSpendingLastMonth, setTotalSpendingLastMonth] = useState(0);
  const [totalSpendingByType, setSpendingByType] = useState({});
  const [totalSpendingByTypeLastMonth, setSpendingByTypeLastMonth] = useState(
    {}
  );
  const [totalBalance, setTotalBalance] = useState(0);

  const refreshData = async () => {
    await getBankAccounts(userId, setBankAccounts, setError);
    await getExpenses(userId, setExpenses, setError);
    await getBudgets(userId, setBudgets, setError);
    await getTransfers(userId, setTransfers, setError);
    await getTotalSpending(userId, setTotalSpending, setError);
    await getTotalSpendingLastMonth(
      userId,
      setTotalSpendingLastMonth,
      setError
    );
    await getTotalBankBalance(userId, setTotalBalance, setError);

    const types = [
      "Housing",
      "Transportation",
      "Food",
      "Entertainment",
      "Personal Care",
    ];

    types.forEach(async (type) => {
      const total = await getTotalSpendingByType(userId, type, setError);
      setSpendingByType((prev) => ({ ...prev, [type]: total }));

      const totalLastMonth = await getTotalSpendingByTypeLastMonth(
        userId,
        type,
        setError
      );

      setSpendingByTypeLastMonth((prev) => ({
        ...prev,
        [type]: totalLastMonth,
      }));
    });
  };

  useEffect(() => {
    refreshData();
  }, [
    userId,
    setBankAccounts,
    setExpenses,
    setBudgets,
    setTransfers,
    setTotalSpending,
    setTotalSpendingLastMonth,
    setSpendingByType,
    setSpendingByTypeLastMonth,
    setTotalBalance,
  ]);
  return (
    <>
      <Stack
        spacing={4}
        width="600px"
        margin="auto"
        paddingTop={50}
        paddingX={4}
      >
        <Text fontSize={"x-large"}>Welcome, {username}</Text>
        <HStack spacing={4}>
          <Button
            onClick={() => setView("budget")}
            colorScheme={view === "budget" ? "teal" : "gray"}
          >
            Budget Overview
          </Button>
          <Button
            onClick={() => setView("expenses")}
            colorScheme={view === "expenses" ? "teal" : "gray"}
          >
            Expenses
          </Button>
          <Button
            onClick={() => setView("bankAccounts")}
            colorScheme={view === "bankAccounts" ? "teal" : "gray"}
          >
            Bank Accounts
          </Button>
          <Button
            onClick={() => setView("transactions")}
            colorScheme={view === "transactions" ? "teal" : "gray"}
          >
            Transactions
          </Button>
        </HStack>
        {view === "budget" && (
          <BudgetOverview
            userId={userId}
            budgets={budgets}
            refreshData={refreshData}
            totalSpending={totalSpending}
            totalSpendingLastMonth={totalSpendingLastMonth}
            bankAccounts={bankAccounts}
            totalSpendingByType={totalSpendingByType}
            totalSpendingByTypeLastMonth={totalSpendingByTypeLastMonth}
            totalBalance={totalBalance}
            setError={setError}
          />
        )}
        {view === "expenses" && (
          <Expenses
            userId={userId}
            expenses={expenses}
            refreshData={refreshData}
            bankAccounts={bankAccounts}
            setError={setError}
          />
        )}
        {view === "bankAccounts" && (
          <BankAccounts
            userId={userId}
            bankAccounts={bankAccounts}
            refreshData={refreshData}
            setError={setError}
          />
        )}
        {view === "transactions" && (
          <Transfers
            userId={userId}
            transfers={transfers}
            refreshData={refreshData}
            setError={setError}
          />
        )}
      </Stack>
      <Button
        onClick={handleLogout}
        position="absolute"
        top={4}
        right={4}
        colorScheme="red"
      >
        Logout
      </Button>
    </>
  );
};

export default Home;
