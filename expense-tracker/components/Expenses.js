import React from "react";
import {
  deleteExpense,
  createExpense,
  editExpense,
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
    address: "",
    isRent: "",
    mode: "",
    store: "",
    isDelivery: "",
    numItems: "",
    numMeals: "",
    event: "",
    item: "",
  });

  const [editExpenseData, setEditExpenseData] = useState({
    id: "",
    bankAccountNum: "",
    type: "",
    amount: "",
    description: "",
    date: "",
    address: "",
    isRent: "",
    mode: "",
    store: "",
    isDelivery: "",
    numItems: "",
    numMeals: "",
    event: "",
    item: "",
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
      if (
        (editExpenseData.type === "Housing" && !editExpenseData.address) ||
        !editExpenseData.isRent
      ) {
        setError("Please fill out all fields");
        return;
      }

      if (editExpenseData.type === "Transportation" && !editExpenseData.mode) {
        setError("Please fill out all fields");
        return;
      }

      if (
        (editExpenseData.type === "Food" && !editExpenseData.store) ||
        !editExpenseData.isDelivery ||
        !editExpenseData.numItems ||
        !editExpenseData.numMeals
      ) {
        setError("Please fill out all fields");
        return;
      }

      if (editExpenseData.type === "Entertainment" && !editExpenseData.event) {
        setError("Please fill out all fields");
        return;
      }

      if (editExpenseData.type === "Personal care" && !editExpenseData.item) {
        setError("Please fill out all fields");
        return;
      }
      setError("Please fill out all fields");
      return;
    }

    let data;
    if (editExpenseData.type === "Housing") {
      data = await editHousingExpense(
        userId,
        editExpenseData.id,
        editExpenseData,
        setError
      );
    } else if (editExpenseData.type === "Transportation") {
      data = await editTransportationExpense(
        userId,
        editExpenseData.id,
        editExpenseData,
        setError
      );
    } else if (editExpenseData.type === "Food") {
      data = await editFoodExpense(
        userId,
        editExpenseData.id,
        editExpenseData,
        setError
      );
    } else if (editExpenseData.type === "Entertainment") {
      data = await editEntertainmentExpense(
        userId,
        editExpenseData.id,
        editExpenseData,
        setError
      );
    } else if (editExpenseData.type === "Personal care") {
      data = await editPersonalCareExpense(
        userId,
        editExpenseData.id,
        editExpenseData,
        setError
      );
    } else {
      data = await editExpense(
        userId,
        editExpenseData.id,
        editExpenseData,
        setError
      );
    }

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
      if (
        (expenseData.type === "Housing" && !expenseData.address) ||
        !expenseData.isRent
      ) {
        setError("Please fill out all fields");
        return;
      }

      if (expenseData.type === "Transportation" && !expenseData.mode) {
        setError("Please fill out all fields");
        return;
      }

      if (
        (expenseData.type === "Food" && !expenseData.store) ||
        !expenseData.isDelivery ||
        !expenseData.numItems ||
        !expenseData.numMeals
      ) {
        setError("Please fill out all fields");
        return;
      }

      if (expenseData.type === "Entertainment" && !expenseData.event) {
        setError("Please fill out all fields");
        return;
      }

      if (expenseData.type === "Personal care" && !expenseData.item) {
        setError("Please fill out all fields");
        return;
      }

      if (expenseData.type === "Personal care" && !expenseData.item) {
        setError("Please fill out all fields");
        return;
      }
      setError("Please fill out all fields");
      return;
    }
    // const data = await createExpense(userId, expenseData, setError);
    let data;
    if (expenseData.type === "Housing") {
      data = await createHousingExpense(userId, expenseData, setError);
    } else if (expenseData.type === "Transportation") {
      data = await createTransportationExpense(userId, expenseData, setError);
    } else if (expenseData.type === "Food") {
      data = await createFoodExpense(userId, expenseData, setError);
    } else if (expenseData.type === "Entertainment") {
      data = await createEntertainmentExpense(userId, expenseData, setError);
    } else if (expenseData.type === "Personal care") {
      data = await createPersonalCareExpense(userId, expenseData, setError);
    } else {
      data = await createExpense(userId, expenseData, setError);
    }

    if (data.message === "Error") {
      setError(`Error creating expense: ${data.error}`);
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
      {expenseData.type === "Housing" && (
        <>
          <Input
            placeholder="Address"
            value={expenseData.address}
            onChange={(e) =>
              setExpenseData({ ...expenseData, address: e.target.value })
            }
          />
          <Select
            placeholder="Is rented"
            value={expenseData.isRent}
            onChange={(e) =>
              setExpenseData({ ...expenseData, isRent: e.target.value })
            }
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Select>
        </>
      )}
      {expenseData.type === "Transportation" && (
        <Select
          placeholder="Mode"
          value={expenseData.mode}
          onChange={(e) =>
            setExpenseData({ ...expenseData, mode: e.target.value })
          }
        >
          <option value="Car">Car</option>
          <option value="Bus">Bus</option>
          <option value="Bike">Train</option>
          <option value="Walk">Bike</option>
          <option value="Other">Walk</option>
        </Select>
      )}
      {expenseData.type === "Food" && (
        <>
          <Input
            placeholder="Store"
            value={expenseData.store}
            onChange={(e) =>
              setExpenseData({ ...expenseData, store: e.target.value })
            }
          />
          <Select
            placeholder="Is delivery"
            value={expenseData.isDelivery}
            onChange={(e) =>
              setExpenseData({ ...expenseData, isDelivery: e.target.value })
            }
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Select>
          <Input
            placeholder="Number of items"
            value={expenseData.numItems}
            onChange={(e) =>
              setExpenseData({ ...expenseData, numItems: e.target.value })
            }
          />
          <Input
            placeholder="Number of meals"
            value={expenseData.numMeals}
            onChange={(e) =>
              setExpenseData({ ...expenseData, numMeals: e.target.value })
            }
          />
        </>
      )}
      {expenseData.type === "Entertainment" && (
        <Input
          placeholder="Event"
          value={expenseData.event}
          onChange={(e) =>
            setExpenseData({ ...expenseData, event: e.target.value })
          }
        />
      )}
      {expenseData.type === "Personal care" && (
        <Input
          placeholder="Item"
          value={expenseData.item}
          onChange={(e) =>
            setExpenseData({ ...expenseData, item: e.target.value })
          }
        />
      )}

      <Button colorScheme="teal" size="sm" onClick={handleCreateExpense}>
        Add Expense
      </Button>
      <Select
        placeholder="Edit Bank Account Number"
        value={editExpenseData.bankAccountNum}
        onChange={(e) =>
          setEditExpenseData({
            ...editExpenseData,
            bankAccountNum: e.target.value,
          })
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
      {editExpenseData.type === "Housing" && (
        <>
          <Input
            placeholder="Edit Address"
            value={editExpenseData.address}
            onChange={(e) =>
              setEditExpenseData({
                ...editExpenseData,
                address: e.target.value,
              })
            }
          />
          <Select
            placeholder="Edit Is rented"
            value={editExpenseData.isRent}
            onChange={(e) =>
              setEditExpenseData({ ...editExpenseData, isRent: e.target.value })
            }
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Select>
        </>
      )}
      {editExpenseData.type === "Transportation" && (
        <Select
          placeholder="Edit Mode"
          value={editExpenseData.mode}
          onChange={(e) =>
            setEditExpenseData({ ...editExpenseData, mode: e.target.value })
          }
        >
          <option value="Car">Car</option>
          <option value="Bus">Bus</option>
          <option value="Bike">Train</option>
          <option value="Walk">Bike</option>
          <option value="Other">Walk</option>
        </Select>
      )}
      {editExpenseData.type === "Food" && (
        <>
          <Input
            placeholder="Edit Store"
            value={editExpenseData.store}
            onChange={(e) =>
              setEditExpenseData({ ...editExpenseData, store: e.target.value })
            }
          />
          <Select
            placeholder="Edit Is delivery"
            value={editExpenseData.isDelivery}
            onChange={(e) =>
              setEditExpenseData({
                ...editExpenseData,
                isDelivery: e.target.value,
              })
            }
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Select>
          <Input
            placeholder="Edit Number of items"
            value={editExpenseData.numItems}
            onChange={(e) =>
              setEditExpenseData({
                ...editExpenseData,
                numItems: e.target.value,
              })
            }
          />
          <Input
            placeholder="Edit Number of meals"
            value={editExpenseData.numMeals}
            onChange={(e) =>
              setEditExpenseData({
                ...editExpenseData,
                numMeals: e.target.value,
              })
            }
          />
        </>
      )}
      {editExpenseData.type === "Entertainment" && (
        <Input
          placeholder="Edit Event"
          value={editExpenseData.event}
          onChange={(e) =>
            setEditExpenseData({ ...editExpenseData, event: e.target.value })
          }
        />
      )}
      {editExpenseData.type === "Personal care" && (
        <Input
          placeholder="Edit Item"
          value={editExpenseData.item}
          onChange={(e) =>
            setEditExpenseData({ ...editExpenseData, item: e.target.value })
          }
        />
      )}
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
                    {expense.expense_type_name === "Housing" && (
                      <>
                        <Text fontSize="sm">
                          Address: {expense.address || "N/A"}
                        </Text>
                        <Text fontSize="sm">
                          Is rented: {expense.is_rent ? "Yes" : "No"}
                        </Text>
                      </>
                    )}
                    {expense.expense_type_name === "Transportation" && (
                      <Text fontSize="sm">Mode: {expense.mode || "N/A"}</Text>
                    )}
                    {expense.expense_type_name === "Food" && (
                      <>
                        <Text fontSize="sm">
                          Store: {expense.store || "N/A"}
                        </Text>
                        <Text fontSize="sm">
                          Is delivery: {expense.is_delivery ? "Yes" : "No"}
                        </Text>
                        <Text fontSize="sm">Items: {expense.num_items}</Text>
                        <Text fontSize="sm">Meals: {expense.num_meals}</Text>
                      </>
                    )}
                    {expense.expense_type_name === "Entertainment" && (
                      <Text fontSize="sm">
                        Activity: {expense.event || "N/A"}
                      </Text>
                    )}
                    {expense.expense_type_name === "Personal Care" && (
                      <Text fontSize="sm">Item: {expense.item || "N/A"}</Text>
                    )}
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
                          address: expense.address,
                          isRent: expense.is_rent ? true : false,
                          mode: expense.mode,
                          store: expense.store,
                          isDelivery: expense.is_delivery ? true : false,
                          numItems: expense.num_items,
                          numMeals: expense.num_meals,
                          event: expense.event,
                          item: expense.item,
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
