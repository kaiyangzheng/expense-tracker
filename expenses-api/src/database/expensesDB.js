const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

class ExpensesDB {
  constructor() {
    this.connection = null;
    this.connect();
  }

  connect() {
    try {
      this.connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      console.log("Connected to database");
    } catch (err) {
      console.error("Error connecting to database: ", err);
    }
  }

  login(name, password, callback) {
    const query = `SELECT * FROM user WHERE name = ? AND password = ?`;
    this.connection.query(query, [name, password], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  }

  signup(name, password, callback) {
    // query insert user and get id
    const query = `INSERT INTO user (name, password) VALUES (?, ?)`;
    this.connection.query(query, [name, password], (err, results) => {
      if (err) {
        callback(err);
      } else {
        // get id
        const query = `SELECT id FROM user WHERE name = ? AND password = ?`;
        this.connection.query(query, [name, password], (err, results) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, results);
          }
        });
      }
    });
  }

  getAllExpenses(userId, callback) {
    const query = `CALL get_all_expenses(?)`;
    this.connection.query(query, [userId], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results[0]);
      }
    });
  }

  getExpensesByDate(userId, month, year, callback) {
    const query = `CALL get_all_expenses_month(?, ?, ?)`;
    this.connection.query(query, [userId, month, year], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results[0]);
      }
    });
  }

  getExpensesByType(userId, type, callback) {
    const query = `CALL get_all_expenses_type(?, ?)`;
    this.connection.query(query, [userId, type], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results[0]);
      }
    });
  }

  getExpensesByTypeAndDate(userId, type, month, year, callback) {
    const query = `CALL get_all_expenses_type_month(?, ?, ?, ?)`;
    this.connection.query(
      query,
      [userId, type, month, year],
      (err, results) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, results[0]);
        }
      }
    );
  }

  addExpense(
    userId,
    bankAccountNum,
    description,
    amount,
    date,
    expenseType,
    callback
  ) {
    const query = `CALL add_expense(?, ?, ?, ?, ?, ?)`;
    this.connection.query(
      query,
      [userId, bankAccountNum, description, amount, date, expenseType],
      (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      }
    );
  }

  updateExpense(
    expenseId,
    userId,
    bankAccountNum,
    description,
    amount,
    date,
    expenseType,
    callback
  ) {
    const query = `CALL update_expense(?, ?, ?, ?, ?, ?, ?)`;
    this.connection.query(
      query,
      [
        expenseId,
        userId,
        bankAccountNum,
        description,
        amount,
        date,
        expenseType,
      ],
      (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      }
    );
  }

  deleteExpense(expenseId, userId, callback) {
    const query = `CALL delete_expense(?, ?)`;
    this.connection.query(query, [expenseId, userId], (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  }

  createBankAccount(accountNum, balance, userId, callback) {
    const query = `INSERT INTO bank_account (account_num, balance, user_id) VALUES (?, ?, ?)`;
    this.connection.query(query, [accountNum, balance, userId], (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  }

  getAllBankAccounts(userId, callback) {
    const query = `SELECT * FROM bank_account WHERE user_id = ?`;
    this.connection.query(query, [userId], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  }

  updateBankAccount(accountNum, balance, userId, callback) {
    const query = `UPDATE bank_account SET balance = ? WHERE account_num = ? AND user_id = ?`;
    this.connection.query(query, [balance, accountNum, userId], (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  }

  deleteBankAccount(accountNum, userId, callback) {
    const query = `DELETE FROM bank_account WHERE account_num = ? AND user_id = ?`;
    this.connection.query(query, [accountNum, userId], (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  }

  getAllTransfers(userId, callback) {
    const query = `CALL get_all_transfers(?)`;
    this.connection.query(query, [userId], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results[0]);
      }
    });
  }

  transferFunds(fromAccountNum, toAccountNum, amount, userId, date, callback) {
    const query = `CALL transfer_money(?, ?, ?, ?, ?)`;
    this.connection.query(
      query,
      [userId, fromAccountNum, toAccountNum, amount, date],
      (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      }
    );
  }

  getAllBudgets(userId, callback) {
    const query = `SELECT * FROM expense_type_budget WHERE user_id = ?`;
    this.connection.query(query, [userId], (err, results) => {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  }

  getBudgetsByDate(userId, month, year, callback) {
    const query = `SELECT * FROM expense_type_budget WHERE user_id = ? AND MONTH(date) = ? AND YEAR(date) = ?`;
    this.connection.query(query, [userId, month, year], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  }

  getBudgetsByType(userId, type, callback) {
    const query = `SELECT * FROM expense_type_budget WHERE user_id = ? AND expense_type_name = ?`;
    this.connection.query(query, [userId, type], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  }

  getBudgetsByTypeAndDate(userId, type, month, year, callback) {
    const query = `SELECT * FROM expense_type_budget WHERE user_id = ? AND expense_type_name = ? AND MONTH(date) = ? AND YEAR(date) = ?`;
    this.connection.query(
      query,
      [userId, type, month, year],
      (err, results) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, results);
        }
      }
    );
  }

  createBudget(userId, type, budget, callback) {
    const query = `INSERT INTO expense_type_budget (user_id, expense_type_name, budget) VALUES (?, ?, ?)`;
    this.connection.query(query, [userId, type, budget], (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  }

  updateBudget(userId, type, budget, callback) {
    const query = `UPDATE expense_type_budget SET budget = ? WHERE user_id = ? AND expense_type_name = ?`;
    this.connection.query(query, [budget, userId, type], (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  }

  deleteBudget(userId, type, month, year, callback) {
    const query = `DELETE FROM expense_type_budget WHERE user_id = ? AND expense_type_name = ? AND MONTH(date) = ? AND YEAR(date) = ?`;
    this.connection.query(query, [userId, type, month, year], (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  }

  getTotalExpenses(userId, callback) {
    const query = `SELECT get_total_expense(?)`;
    this.connection.query(query, [userId], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results[0]);
      }
    });
  }

  getTotalExpensesByDate(userId, month, year, callback) {
    const query = `SELECT get_total_expense_month(?, ?, ?)`;
    this.connection.query(query, [userId, month, year], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results[0]);
      }
    });
  }

  getTotalExpensesByType(userId, type, callback) {
    const query = `SELECT get_total_expense_type(?, ?)`;
    this.connection.query(query, [userId, type], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results[0]);
      }
    });
  }

  getTotalExpensesByTypeAndDate(userId, type, month, year, callback) {
    const query = `SELECT get_total_expense_type_month(?, ?, ?, ?)`;
    this.connection.query(
      query,
      [userId, type, month, year],
      (err, results) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, results[0]);
        }
      }
    );
  }

  getTotalBankAccountsBalance(userId, callback) {
    const query = `SELECT get_total_balance(?)`;
    this.connection.query(query, [userId], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results[0]);
      }
    });
  }

  addHousingExpense(
    userId,
    bankAccountNum,
    description,
    amount,
    date,
    address,
    isRent,
    callback
  ) {
    const query = `CALL add_housing_expense(?, ?, ?, ?, ?, ?, ?)`;
    this.connection.query(
      query,
      [userId, bankAccountNum, description, amount, date, address, isRent],
      (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      }
    );
  }

  addTransportationExpense(
    userId,
    bankAccountNum,
    description,
    amount,
    date,
    mode,
    callback
  ) {
    const query = `CALL add_transportation_expense(?, ?, ?, ?, ?, ?)`;
    this.connection.query(
      query,
      [userId, bankAccountNum, description, amount, date, mode],
      (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      }
    );
  }

  addFoodExpense(
    userId,
    bankAccountNum,
    description,
    amount,
    date,
    store,
    isDelivery,
    numItems,
    numMeals,
    callback
  ) {
    const query = `CALL add_food_expense(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    this.connection.query(
      query,
      [
        userId,
        bankAccountNum,
        description,
        amount,
        date,
        store,
        isDelivery,
        numItems,
        numMeals,
      ],
      (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      }
    );
  }

  addEntertainmentExpense(
    userId,
    bankAccountNum,
    description,
    amount,
    date,
    event,
    callback
  ) {
    const query = `CALL add_entertainment_expense(?, ?, ?, ?, ?, ?)`;
    this.connection.query(
      query,
      [userId, bankAccountNum, description, amount, date, event],
      (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      }
    );
  }

  addPersonalCareExpense(
    userId,
    bankAccountNum,
    description,
    amount,
    date,
    item,
    callback
  ) {
    const query = `CALL add_personal_care_expense(?, ?, ?, ?, ?, ?)`;
    this.connection.query(
      query,
      [userId, bankAccountNum, description, amount, date, item],
      (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      }
    );
  }

  updateHousingExpense(
    expenseId,
    userId,
    bankAccountNum,
    description,
    amount,
    date,
    address,
    isRent,
    callback
  ) {
    const query = `CALL update_housing_expense(?, ?, ?, ?, ?, ?, ?, ?)`;
    this.connection.query(
      query,
      [
        expenseId,
        userId,
        bankAccountNum,
        description,
        amount,
        date,
        address,
        isRent,
      ],
      (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      }
    );
  }

  updateTransportationExpense(
    expenseId,
    userId,
    bankAccountNum,
    description,
    amount,
    date,
    mode,
    callback
  ) {
    const query = `CALL update_transportation_expense(?, ?, ?, ?, ?, ?, ?)`;
    this.connection.query(
      query,
      [expenseId, userId, bankAccountNum, description, amount, date, mode],
      (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      }
    );
  }

  updateFoodExpense(
    expenseId,
    userId,
    bankAccountNum,
    description,
    amount,
    date,
    store,
    isDelivery,
    numItems,
    numMeals,
    callback
  ) {
    const query = `CALL update_food_expense(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    this.connection.query(
      query,
      [
        expenseId,
        userId,
        bankAccountNum,
        description,
        amount,
        date,
        store,
        isDelivery,
        numItems,
        numMeals,
      ],
      (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      }
    );
  }

  updateEntertainmentExpense(
    expenseId,
    userId,
    bankAccountNum,
    description,
    amount,
    date,
    event,
    callback
  ) {
    const query = `CALL update_entertainment_expense(?, ?, ?, ?, ?, ?, ?)`;
    this.connection.query(
      query,
      [expenseId, userId, bankAccountNum, description, amount, date, event],
      (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      }
    );
  }

  updatePersonalCareExpense(
    expenseId,
    userId,
    bankAccountNum,
    description,
    amount,
    date,
    item,
    callback
  ) {
    const query = `CALL update_personal_care_expense(?, ?, ?, ?, ?, ?, ?)`;
    this.connection.query(
      query,
      [expenseId, userId, bankAccountNum, description, amount, date, item],
      (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      }
    );
  }
}

const expensesDB = new ExpensesDB();
module.exports = expensesDB;
