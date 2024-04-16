const express = require("express");
const router = express.Router();
const expensesController = require("../controllers/expensesController");

// get all expenses
router.get("/user/:userId", expensesController.getAllExpenses);

// add expense
router.post("/user/:userId", expensesController.addExpense);

// add housing expense
router.post("/housing/user/:userId", expensesController.addHousingExpense);

// add transportation expense
router.post(
  "/transportation/user/:userId",
  expensesController.addTransportationExpense
);

// add food expense
router.post("/food/user/:userId", expensesController.addFoodExpense);

// add entertainment expense
router.post(
  "/entertainment/user/:userId",
  expensesController.addEntertainmentExpense
);

// add personal care expense
router.post(
  "/personalCare/user/:userId",
  expensesController.addPersonalCareExpense
);

// update expense
router.put("/:id/user/:userId", expensesController.updateExpense);

// update housing expense
router.put(
  "/housing/:id/user/:userId",
  expensesController.updateHousingExpense
);

// update transportation expense
router.put(
  "/transportation/:id/user/:userId",
  expensesController.updateTransportationExpense
);

// update food expense
router.put("/food/:id/user/:userId", expensesController.updateFoodExpense);

// update entertainment expense
router.put(
  "/entertainment/:id/user/:userId",
  expensesController.updateEntertainmentExpense
);

// update personal care expense
router.put(
  "/personalCare/:id/user/:userId",
  expensesController.updatePersonalCareExpense
);

// delete expense
router.delete("/:id/user/:userId", expensesController.deleteExpense);

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
