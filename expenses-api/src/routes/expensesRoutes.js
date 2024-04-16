const express = require("express");
const router = express.Router();
const expensesController = require("../controllers/expensesController");

// get all expenses
router.get("/user/:userId", expensesController.getAllExpenses);

// add expense
router.post("/user/:userId", expensesController.addExpense);

// update expense
router.put("/:id/user/:userId", expensesController.updateExpense);

// delete expense
router.delete("/:id/user/:userId", expensesController.deleteExpense);
module.exports = router;

// get total expenses value
router.get("/total/user/:userId", expensesController.getTotalExpenses);

// get total expenses value by date
router.get(
  "/total/month/:month/year/:year/user/:userId",
  expensesController.getTotalExpensesByDate
);

// get total expenses value by type
router.get(
  "/total/type/:type/user/:userId",
  expensesController.getTotalExpensesByType
);

// get total expenses value by type and date
router.get(
  "/total/type/:type/month/:month/year/:year/user/:userId",
  expensesController.getTotalExpensesByTypeAndDate
);

module.exports = router;
