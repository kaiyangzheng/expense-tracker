import React from "react";
import { useState, useEffect } from "react";
import { Flex, Input, Button, Text } from "@chakra-ui/react";

const Login = ({ setUserId, setPageState, setUsername, setError }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");

    if (userId && username) {
      setUserId(userId);
      setUsername(username);
      setPageState("home");
    }
  }, []);

  const handleLogin = async () => {
    if (!name || !password) {
      setError("Please fill out all fields");
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      }
    );

    const data = await response.json();
    console.log(data);
    if (data.message === "Error") {
      setError(`Error logging in: ${data.error}`);
      return;
    }

    setUserId(data.userId);
    setUsername(data.name);
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("username", data.name);
    setName("");
    setPassword("");
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
          placeholder="Enter your username"
          onChange={(e) => setName(e.target.value)}
          marginBottom={4}
        />
        <Input
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          marginBottom={4}
        />
        <Button type="submit" onClick={handleLogin} marginBottom={4}>
          Login
        </Button>
        <Button onClick={() => setPageState("signup")}>Register</Button>
      </Flex>
    </>
  );
};

export default Login;
