import React from "react";
import {
  deleteExpense,
  createExpense,
  editExpense,
} from "@/utils/expenseDBUtils";
import {
  Text,
  Flex,
  Box,
  Button,
  Input,
  Stack,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";

const Expenses = ({
  userId,
  expenses,
  refreshData,
  bankAccounts,
  setError,
}) => {
  const [expenseData, setExpenseData] = useState({
    bankAccountNum: "",
    type: "",
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [editExpenseData, setEditExpenseData] = useState({
    id: "",
    bankAccountNum: "",
    type: "",
    amount: "",
    description: "",
    date: "",
  });

  const handleDeleteExpense = async (expenseId) => {
    const data = await deleteExpense(userId, expenseId, setError);
    if (data.message === "Error") {
      setError(`Error deleting expense: ${data.error}`);
      return;
    }
    refreshData();
  };

  const handleEditExpense = async () => {
    if (
      !editExpenseData.bankAccountNum ||
      !editExpenseData.type ||
      !editExpenseData.amount ||
      !editExpenseData.date
    ) {
      setError("Please fill out all fields");
      return;
    }
    const data = await editExpense(
      userId,
      editExpenseData.id,
      editExpenseData,
      setError
    );
    if (data.message === "Error") {
      setError(`Error editing expense: ${data.error}`);
      return;
    }
    refreshData();
    setEditExpenseData({
      bankAccountNum: "",
      type: "",
      amount: "",
      description: "",
      date: "",
    });
  };

  const handleCreateExpense = async () => {
    if (
      !expenseData.bankAccountNum ||
      !expenseData.type ||
      !expenseData.amount ||
      !expenseData.date
    ) {
      setError("Please fill out all fields");
      return;
    }
    const data = await createExpense(userId, expenseData, setError);
    if (data.message === "Error") {
      return;
    }
    refreshData();
    setExpenseData({
      bankAccountNum: "",
      type: "",
      amount: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <>
      <Select
        placeholder="Bank Account Number"
        value={expenseData.bankAccountNum}
        onChange={(e) =>
          setExpenseData({ ...expenseData, bankAccountNum: e.target.value })
        }
      >
        {bankAccounts.map((account) => {
          return (
            <option key={account.account_num} value={account.account_num}>
              #{account.account_num}: ${account.balance}
            </option>
          );
        })}
      </Select>
      <Select
        placeholder="Expense Type"
        value={expenseData.type}
        onChange={(e) =>
          setExpenseData({ ...expenseData, type: e.target.value })
        }
      >
        <option value="Housing">Housing</option>
        <option value="Transportation">Transportation</option>
        <option value="Food">Food</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Personal care">Personal Care</option>
      </Select>
      <Input
        placeholder="Amount"
        value={expenseData.amount}
        onChange={(e) =>
          setExpenseData({ ...expenseData, amount: e.target.value })
        }
      />
      <Input
        placeholder="Description"
        value={expenseData.description}
        onChange={(e) =>
          setExpenseData({ ...expenseData, description: e.target.value })
        }
      />
      <Input
        placeholder="Date"
        type="date"
        value={expenseData.date}
        onChange={(e) =>
          setExpenseData({ ...expenseData, date: e.target.value })
        }
      />
      <Button colorScheme="teal" size="sm" onClick={handleCreateExpense}>
        Add Expense
      </Button>
      <Input
        placeholder="Edit Bank Account Number"
        value={editExpenseData.bankAccountNum}
        onChange={(e) =>
          setEditExpenseData({
            ...editExpenseData,
            bankAccountNum: e.target.value,
          })
        }
      />
      <Select
        placeholder="Edit Expense Type"
        value={editExpenseData.type}
        onChange={(e) =>
          setEditExpenseData({ ...editExpenseData, type: e.target.value })
        }
      >
        <option value="Housing">Housing</option>
        <option value="Transportation">Transportation</option>
        <option value="Food">Food</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Personal care">Personal Care</option>
      </Select>

      <Input
        placeholder="Edit Amount"
        value={editExpenseData.amount}
        onChange={(e) =>
          setEditExpenseData({ ...editExpenseData, amount: e.target.value })
        }
      />
      <Input
        placeholder="Edit Description"
        value={editExpenseData.description}
        onChange={(e) =>
          setEditExpenseData({
            ...editExpenseData,
            description: e.target.value,
          })
        }
      />
      <Input
        placeholder="Edit Date"
        type="date"
        value={editExpenseData.date}
        onChange={(e) =>
          setEditExpenseData({ ...editExpenseData, date: e.target.value })
        }
      />
      <Button colorScheme="teal" size="sm" onClick={handleEditExpense}>
        Edit Expense
      </Button>
      {Object.keys(expenses).map((date) => {
        return (
          <Box key={date} marginBottom={2}>
            <Text fontSize="large" marginBottom={2} fontWeight="bold">
              {date}
            </Text>
            {expenses[date].map((expense) => {
              return (
                <Flex
                  key={expense.id}
                  borderWidth="1px"
                  borderRadius="lg"
                  justifyContent="space-between"
                  alignItems="center"
                  p={4}
                  marginBottom={4}
                >
                  <Box>
                    <Text fontWeight="bold">{expense.expense_type_name}</Text>
                    <Text fontSize="sm">
                      Amount: ${expense.amount} | account: #
                      {expense.account_num}
                    </Text>
                    <Text fontSize="sm">
                      Description: {expense.description || "N/A"}
                    </Text>
                  </Box>
                  <Stack direction="row">
                    <Button
                      colorScheme="teal"
                      size="sm"
                      onClick={() => {
                        setEditExpenseData({
                          id: expense.id,
                          bankAccountNum: expense.account_num,
                          type: expense.expense_type_name,
                          amount: expense.amount,
                          description: expense.description,
                          date: new Date(expense.date)
                            .toISOString()
                            .split("T")[0],
                        });
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDeleteExpense(expense.id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </Flex>
              );
            })}
          </Box>
        );
      })}
    </>
  );
};

export default Expenses;
