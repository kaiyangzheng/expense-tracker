const expensesDB = require("../database/expensesDB");

const getAllBudgets = (req, res) => {
  const { userId } = req.params;

  expensesDB.getAllBudgets(userId, (err, results) => {
    if (err) {
      res.status(500).send({ message: "Error", error: err["sqlMessage"] });
    } else {
      res.status(200).send(results);
    }
  });
};

const createBudget = (req, res) => {
  const { userId } = req.params;
  const { type, budget } = req.body;

  expensesDB.createBudget(userId, type, budget, (err) => {
    if (err) {
      res.status(500).send({ message: "Error", error: err["sqlMessage"] });
    } else {
      res.status(200).send({ message: "Budget created" });
    }
  });
};

const updateBudget = (req, res) => {
  const { userId, type } = req.params;
  const { budget } = req.body;

  expensesDB.updateBudget(userId, type, budget, (err) => {
    if (err) {
      res.status(500).send({ message: "Error", error: err["sqlMessage"] });
    } else {
      res.status(200).send({ message: "Budget updated" });
    }
  });
};

const deleteBudget = (req, res) => {
  const { userId, type, month, year } = req.params;

  expensesDB.deleteBudget(userId, type, month, year, (err) => {
    if (err) {
      res.status(500).send({ message: "Error", error: err["sqlMessage"] });
    } else {
      res.status(200).send({ message: "Budget deleted" });
    }
  });
};

module.exports = {
  getAllBudgets,
  deleteBudget,
  createBudget,
  updateBudget,
};
