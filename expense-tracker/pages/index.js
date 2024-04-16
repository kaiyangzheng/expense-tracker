import Login from "@/components/Login";
import Home from "@/components/Home";
import Signup from "@/components/Signup";
import { useState, useEffect } from "react";
import Head from "next/head";
import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";

export default function Index() {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [pageState, setPageState] = useState("login");
  const [error, setError] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    setUserId(null);
    setUsername("");
    setPageState("login");
  };

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  return (
    <>
      <Head>
        <title>Expense Tracker</title>
        <meta name="description" content="Expense Tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {pageState === "login" && (
        <Login
          setUserId={setUserId}
          setPageState={setPageState}
          setUsername={setUsername}
          setError={setError}
        />
      )}
      {pageState === "signup" && (
        <Signup
          setUserId={setUserId}
          setPageState={setPageState}
          setUsername={setUsername}
          setError={setError}
        />
      )}
      {pageState === "home" && (
        <Home
          userId={userId}
          username={username}
          handleLogout={handleLogout}
          setError={setError}
        />
      )}
    </>
  );
}
