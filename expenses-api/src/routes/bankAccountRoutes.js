const express = require("express");
const router = express.Router();
const bankAccountController = require("../controllers/bankAccountController");

// create bank account
router.post("/user/:userId", bankAccountController.createBankAccount);

// get all bank accounts
router.get("/user/:userId", bankAccountController.getAllBankAccounts);

// update bank account
router.put(
  "/:accountNum/user/:userId",
  bankAccountController.updateBankAccount
);

// delete bank account
router.delete(
  "/:accountNum/user/:userId",
  bankAccountController.deleteBankAccount
);

// get all transfers
router.get("/transfers/user/:userId", bankAccountController.getAllTransfers);

// transfer funds
router.post("/transfer/user/:userId", bankAccountController.transferFunds);

// get total balance
router.get("/balance/user/:userId", bankAccountController.getTotalBalance);

module.exports = router;
