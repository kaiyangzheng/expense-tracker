import React from "react";
import { editBudget } from "@/utils/expenseDBUtils";
import {
  Text,
  Flex,
  Box,
  Button,
  Input,
  Select,
  Progress,
} from "@chakra-ui/react";
import { useState } from "react";

const BudgetOverview = ({
  userId,
  budgets,
  refreshData,
  totalSpending,
  totalSpendingLastMonth,
  bankAccounts,
  totalSpendingByType,
  totalSpendingByTypeLastMonth,
  totalBalance,
  setError,
}) => {
  const [expenseType, setExpenseType] = useState("");
  const [budget, setBudget] = useState("");

  const handleEditBudget = async () => {
    if (!expenseType || !budget) {
      setError("Please fill out all fields");
      return;
    }
    const data = await editBudget(userId, expenseType, budget, setError);
    if (data.message === "Error") {
      setError(`Error editing budget: ${data.error}`);
      return;
    }
    refreshData();
    setExpenseType("");
    setBudget("");
  };

  return (
    <>
      <Text>Total Spending All Time: ${totalSpending}</Text>
      <Text>Total Spending This Month: ${totalSpendingLastMonth}</Text>
      <Text>Total Bank Balance: ${totalBalance}</Text>
      {bankAccounts.map((account) => {
        if (account.balance < 20) {
          return (
            <Text color="red">
              Low balance in account #{account.account_num} (${account.balance}{" "}
              remaining)
            </Text>
          );
        }
      })}
      {Object.keys(budgets).map((key) => {
        return (
          <Flex
            key={key}
            justify="space-between"
            alignItems="center"
            marginBottom={2}
            padding={4}
            borderWidth="1px"
            borderRadius="lg"
          >
            <Box>
              <Text fontWeight="bold">{key}</Text>
              <Text>Spending Limit: ${budgets[key].budget}</Text>
              <Text
                color={
                  totalSpendingByTypeLastMonth[key] > budgets[key].budget - 20
                    ? "red"
                    : "black"
                }
              >
                Remaining: $
                {budgets[key].budget - totalSpendingByTypeLastMonth[key]} (
                {100 -
                  (totalSpendingByTypeLastMonth[key] / budgets[key].budget) *
                    100}
                % Remaining)
              </Text>
              <Progress
                value={
                  100 -
                  (totalSpendingByTypeLastMonth[key] / budgets[key].budget) *
                    100
                }
                width="300px"
              />
              <Text fontSize="sm">
                Spending All Time: ${totalSpendingByType[key] || 0}
              </Text>
            </Box>
            <Box>
              <Button
                colorScheme="teal"
                size="sm"
                onClick={() => {
                  setExpenseType(key);
                  setBudget(budgets[key].budget);
                }}
              >
                Edit
              </Button>
            </Box>
          </Flex>
        );
      })}
      <Select
        placeholder="Expense Type"
        value={expenseType}
        onChange={(e) => setExpenseType(e.target.value)}
      >
        <option value="Housing">Housing</option>
        <option value="Transportation">Transportation</option>
        <option value="Food">Food</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Personal care">Personal Care</option>
      </Select>
      <Input
        placeholder="Budget"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />
      <Button
        colorScheme="teal"
        size="sm"
        onClick={handleEditBudget}
        marginBottom={4}
      >
        Edit Budget
      </Button>
    </>
  );
};

export default BudgetOverview;
