import React from "react";
import { createTransfer } from "@/utils/expenseDBUtils";
import { Text, Flex, Box, Button, Input, Select } from "@chakra-ui/react";
import { useState } from "react";

const Transfers = ({ userId, transfers, refreshData, setError }) => {
  const [transferData, setTransferData] = useState({
    fromAccountNum: "",
    toAccountNum: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleCreateTransfer = async () => {
    if (
      !transferData.fromAccountNum ||
      !transferData.toAccountNum ||
      !transferData.amount ||
      !transferData.date
    ) {
      setError("Please fill out all fields");
      return;
    }
    const data = await createTransfer(userId, transferData, setError);
    if (data.message === "Error") {
      setError(`Error creating transfer: ${data.error}`);
      return;
    }
    refreshData();
    setTransferData({
      fromAccountNum: "",
      toAccountNum: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <>
      <Input
        placeholder="From Account Number"
        value={transferData.fromAccountNum}
        onChange={(e) =>
          setTransferData({ ...transferData, fromAccountNum: e.target.value })
        }
      />
      <Input
        placeholder="To Account Number"
        value={transferData.toAccountNum}
        onChange={(e) =>
          setTransferData({ ...transferData, toAccountNum: e.target.value })
        }
      />
      <Input
        placeholder="Amount"
        value={transferData.amount}
        onChange={(e) =>
          setTransferData({ ...transferData, amount: e.target.value })
        }
      />
      <Input
        type="date"
        value={transferData.date}
        onChange={(e) =>
          setTransferData({ ...transferData, date: e.target.value })
        }
      />
      <Button colorScheme="teal" size="sm" onClick={handleCreateTransfer}>
        Create Transfer
      </Button>
      {transfers.map((transfer) => {
        return (
          <Flex
            key={transfer.transfer_id}
            justify="space-between"
            alignItems="center"
            marginBottom={2}
            padding={4}
            borderWidth="1px"
            borderRadius="lg"
          >
            <Box>
              <Text fontWeight="bold" fontSize="x-large">
                ${transfer.amount}
              </Text>
              <Text>
                Account #{transfer.from_bank_account_num} transfer to #
                {transfer.to_bank_account_num}
              </Text>
              <Text>Date: {new Date(transfer.date).toDateString()}</Text>
            </Box>
          </Flex>
        );
      })}
    </>
  );
};

export default Transfers;
