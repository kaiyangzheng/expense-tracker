const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// login
router.post("/login", authController.login);

// signup
router.post("/signup", authController.signup);

module.exports = router;
