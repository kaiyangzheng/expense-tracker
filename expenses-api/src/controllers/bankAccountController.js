const expensesDB = require("../database/expensesDB");

const createBankAccount = (req, res) => {
  const { userId } = req.params;
  const { accountNum, balance } = req.body;
  expensesDB.createBankAccount(accountNum, balance, userId, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Error", error: err["sqlMessage"] });
    } else {
      res.status(200).send({ message: "Bank account created" });
    }
  });
};

const getAllBankAccounts = (req, res) => {
  const { userId } = req.params;
  expensesDB.getAllBankAccounts(userId, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Error", error: err["sqlMessage"] });
    } else {
      res.status(200).send(results);
    }
  });
};

const updateBankAccount = (req, res) => {
  const { accountNum, userId } = req.params;
  const { balance } = req.body;

  expensesDB.updateBankAccount(accountNum, balance, userId, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Error", error: err["sqlMessage"] });
    } else {
      res.status(200).send({ message: "Bank account updated" });
    }
  });
};

const deleteBankAccount = (req, res) => {
  const { accountNum, userId } = req.params;

  expensesDB.deleteBankAccount(accountNum, userId, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Error", error: err["sqlMessage"] });
    } else {
      res.status(200).send({ message: "Bank account deleted" });
    }
  });
};

const getAllTransfers = (req, res) => {
  const { userId } = req.params;
  expensesDB.getAllTransfers(userId, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Error", error: err["sqlMessage"] });
    } else {
      res.status(200).send(results);
    }
  });
};

const transferFunds = (req, res) => {
  const { userId } = req.params;
  const { fromAccountNum, toAccountNum, amount, date } = req.body;
  expensesDB.transferFunds(
    fromAccountNum,
    toAccountNum,
    amount,
    userId,
    date,
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Error", error: err["sqlMessage"] });
      } else {
        res.status(200).send({ message: "Funds transferred" });
      }
    }
  );
};

const getTotalBalance = (req, res) => {
  const { userId } = req.params;
  expensesDB.getTotalBankAccountsBalance(userId, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Error", error: err["sqlMessage"] });
    } else {
      res.status(200).send(results);
    }
  });
};

module.exports = {
  createBankAccount,
  getAllBankAccounts,
  updateBankAccount,
  deleteBankAccount,
  getAllTransfers,
  transferFunds,
  getTotalBalance,
};
