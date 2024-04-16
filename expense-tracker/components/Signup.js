import React from "react";
import { createBudget, createBankAccount } from "@/utils/expenseDBUtils";
import { Text, Flex, Button, Input } from "@chakra-ui/react";
import { useState } from "react";

const Signup = ({ setUserId, setPageState, setUsername, setError }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [housingBudget, setHousingBudget] = useState(0);
  const [transportationBudget, setTransportationBudget] = useState(0);
  const [foodBudget, setFoodBudget] = useState(0);
  const [entertainmentBudget, setEntertainmentBudget] = useState(0);
  const [personalCareBudget, setPersonalCareBudget] = useState(0);

  const [bankAccountNum, setBankAccountNum] = useState(null);
  const [bankAccountBalance, setBankAccountBalance] = useState(null);

  const handleSignup = async () => {
    if (
      !housingBudget ||
      !transportationBudget ||
      !foodBudget ||
      !entertainmentBudget ||
      !personalCareBudget ||
      !name ||
      !password ||
      !bankAccountNum ||
      !bankAccountBalance
    ) {
      setError("Please fill out all fields");
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          password,
        }),
      }
    );
    const userData = await response.json();
    if (userData.message === "Error") {
      return;
    }
    setUserId(userData.userId);
    setUsername(name);
    localStorage.setItem("userId", userData.userId);
    localStorage.setItem("username", name);

    const userId = userData.userId;

    let data = await createBudget(userId, "Housing", housingBudget);
    if (data.message === "Error") {
      setError(`Error creating budget: ${data.error}`);
      return;
    }

    data = await createBudget(userId, "Transportation", transportationBudget);
    if (data.message === "Error") {
      setError(`Error creating budget: ${data.error}`);
      return;
    }

    data = await createBudget(userId, "Food", foodBudget);
    if (data.message === "Error") {
      setError(`Error creating budget: ${data.error}`);
      return;
    }

    data = await createBudget(userId, "Entertainment", entertainmentBudget);
    if (data.message === "Error") {
      setError(`Error creating budget: ${data.error}`);
      return;
    }

    data = await createBudget(userId, "Personal Care", personalCareBudget);
    if (data.message === "Error") {
      setError(`Error creating budget: ${data.error}`);
      return;
    }

    data = await createBankAccount(userId, bankAccountNum, bankAccountBalance);
    if (data.message === "Error") {
      setError(`Error creating bank account: ${data.error}`);
      return;
    }

    setPageState("home");
  };

  return (
    <>
      <Flex
        justify="center"
        h="100vh"
        width="400px"
        margin="auto"
        direction="column"
      >
        <Text fontSize={"x-large"} marginBottom={4}>
          Welcome to Expense Tracker
        </Text>
        <Input
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          marginBottom={4}
        />
        <Input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          marginBottom={8}
          type="password"
        />

        <Input
          placeholder="Bank Account #"
          marginBottom={4}
          type="number"
          value={bankAccountNum}
          onChange={(e) => setBankAccountNum(e.target.value)}
        />
        <Input
          placeholder="Bank Account Balance"
          type="number"
          value={bankAccountBalance}
          onChange={(e) => setBankAccountBalance(e.target.value)}
          marginBottom={8}
        />

        <Input
          placeholder="Initial Housing Budget (Monthly)"
          onChange={(e) => setHousingBudget(e.target.value)}
          type="number"
          marginBottom={4}
        />

        <Input
          placeholder="Initial Transportation Budget (Monthly)"
          onChange={(e) => setTransportationBudget(e.target.value)}
          type="number"
          marginBottom={4}
        />

        <Input
          placeholder="Initial Food Budget (Monthly)"
          onChange={(e) => setFoodBudget(e.target.value)}
          type="number"
          marginBottom={4}
        />

        <Input
          placeholder="Initial Entertainment Budget (Monthly)"
          onChange={(e) => setEntertainmentBudget(e.target.value)}
          type="number"
          marginBottom={4}
        />

        <Input
          placeholder="Initial Personal Care Budget (Monthly)"
          onChange={(e) => setPersonalCareBudget(e.target.value)}
          type="number"
          marginBottom={4}
        />

        <Button size="md" onClick={handleSignup} marginBottom={4}>
          Signup
        </Button>
        <Button size="md" onClick={() => setPageState("login")}>
          Login
        </Button>
      </Flex>
    </>
  );
};

export default Signup;
