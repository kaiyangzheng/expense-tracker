const express = require("express");
const router = express.Router();
const budgetController = require("../controllers/budgetController");

// get all budgets
router.get("/user/:userId", budgetController.getAllBudgets);

// create budget
router.post("/user/:userId", budgetController.createBudget);

// delete budget
router.delete(
  "/type/:type/month/:month/year/:year/user/:user",
  budgetController.deleteBudget
);

// update budget
router.put("/type/:type/user/:userId", budgetController.updateBudget);

module.exports = router;
