const express = require("express");

const expensesRoutes = require("./routes/expensesRoutes");
const authRoutes = require("./routes/authRoutes");
const bankAccountRoutes = require("./routes/bankAccountRoutes");
const budgetRoutes = require("./routes/budgetRoutes");

const dotenv = require("dotenv");
const bodyParser = require("body-parser");
let cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(bodyParser.json());
app.use(cors());

app.use("/expense", expensesRoutes);
app.use("/auth", authRoutes);
app.use("/bank", bankAccountRoutes);
app.use("/budget", budgetRoutes);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
