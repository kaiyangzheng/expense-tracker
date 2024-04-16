const expensesDB = require("../database/expensesDB");

const getAllExpenses = (req, res) => {
  const { userId } = req.params;
  expensesDB.getAllExpenses(userId, (err, results) => {
    if (err) {
      res.status(500).send({ message: "Error", error: err["sqlMessage"] });
    } else {
      res.status(200).send(results);
    }
  });
};

const addExpense = (req, res) => {
  const { userId } = req.params;
  const { bankAccountNum, description, type, amount, date } = req.body;
  expensesDB.addExpense(
    userId,
    bankAccountNum,
    description,
    amount,
    date,
    type,
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Error", error: err["sqlMessage"] });
      } else {
        res.status(200).send({ message: "Expense added" });
      }
    }
  );
};

const updateExpense = (req, res) => {
  const { id, userId } = req.params;
  const { bankAccountNum, description, type, amount, date } = req.body;
  expensesDB.updateExpense(
    id,
    userId,
    bankAccountNum,
    description,
    amount,
    date,
    type,
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Error", error: err["sqlMessage"] });
      } else {
        res.status(200).send({ message: "Expense updated" });
      }
    }
  );
};

const deleteExpense = (req, res) => {
  const { id, userId } = req.params;
  expensesDB.deleteExpense(id, userId, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Error", error: err["sqlMessage"] });
      res.status(200).send({ message: "Expense deleted" });
    }
  });
};

const getTotalExpenses = (req, res) => {
  const { userId } = req.params;
  expensesDB.getTotalExpenses(userId, (err, results) => {
    if (err) {
      res.status(500).send({ message: "Error", error: err["sqlMessage"] });
    } else {
      res.status(200).send(results);
    }
  });
};

const getTotalExpensesByDate = (req, res) => {
  const { userId, month, year } = req.params;
  expensesDB.getTotalExpensesByDate(userId, month, year, (err, results) => {
    if (err) {
      res.status(500).send({ message: "Error", error: err["sqlMessage"] });
    } else {
      res.status(200).send(results);
    }
  });
};

const getTotalExpensesByType = (req, res) => {
  const { userId, type } = req.params;
  expensesDB.getTotalExpensesByType(userId, type, (err, results) => {
    if (err) {
      res.status(500).send({ message: "Error", error: err["sqlMessage"] });
    } else {
      res.status(200).send(results);
    }
  });
};

const getTotalExpensesByTypeAndDate = (req, res) => {
  const { userId, type, month, year } = req.params;
  expensesDB.getTotalExpensesByTypeAndDate(
    userId,
    type,
    month,
    year,
    (err, results) => {
      if (err) {
        res.status(500).send({ message: "Error", error: err["sqlMessage"] });
      } else {
        res.status(200).send(results);
      }
    }
  );
};

module.exports = {
  getAllExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  getTotalExpenses,
  getTotalExpensesByDate,
  getTotalExpensesByType,
  getTotalExpensesByTypeAndDate,
};
