import React from "react";
import { Text, Flex, Box, Button, Input } from "@chakra-ui/react";
import { createBankAccount, editBankAccount } from "@/utils/expenseDBUtils";
import { useState } from "react";

const BankAccounts = ({ userId, bankAccounts, refreshData, setError }) => {
  const [accountNum, setAccountNum] = useState("");
  const [balance, setBalance] = useState("");

  const [editAccountNum, setEditAccountNum] = useState("");
  const [editBalance, setEditBalance] = useState("");

  const handleCreateBankAccount = async () => {
    setAccountNum("");
    setBalance("");
    if (!accountNum || !balance) {
      return;
    }
    const data = await createBankAccount(userId, accountNum, balance, setError);

    if (data.message === "Error") {
      return;
    }
    refreshData();
  };

  const handleEditBankAccount = async () => {
    setEditAccountNum("");
    setEditBalance("");
    if (!editAccountNum || !editBalance) {
      setError("Please fill out all fields");
      return;
    }
    const data = await editBankAccount(
      userId,
      editAccountNum,
      editBalance,
      setError
    );

    if (data.message === "Error") {
      setError(`Error editing bank account: ${data.error}`);
      return;
    }
    refreshData();
  };

  return (
    <>
      <Input
        placeholder="Account Number"
        value={accountNum}
        onChange={(e) => setAccountNum(e.target.value)}
      />
      <Input
        placeholder="Balance"
        value={balance}
        onChange={(e) => setBalance(e.target.value)}
      />
      <Button colorScheme="teal" size="sm" onClick={handleCreateBankAccount}>
        Add Bank Account
      </Button>
      <Input
        placeholder="Edit Account Number"
        value={editAccountNum}
        onChange={(e) => setEditAccountNum(e.target.value)}
      />
      <Input
        placeholder="Edit Balance"
        value={editBalance}
        onChange={(e) => setEditBalance(e.target.value)}
      />
      <Button colorScheme="teal" size="sm" onClick={handleEditBankAccount}>
        Save Changes
      </Button>
      {bankAccounts.map((account) => (
        <Flex
          key={account.account_number}
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Text fontWeight="bold">Account number: {account.account_num}</Text>
            <Text>Balance: ${account.balance}</Text>
          </Box>
          <Box>
            <Button
              colorScheme="teal"
              size="sm"
              onClick={() => {
                setEditAccountNum(account.account_num);
                setEditBalance(account.balance);
              }}
            >
              Edit
            </Button>
          </Box>
        </Flex>
      ))}
    </>
  );
};

export default BankAccounts;
