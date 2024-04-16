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
    } else {
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

const addHousingExpense = (req, res) => {
  const { userId } = req.params;
  const { bankAccountNum, description, amount, date, address, isRent } =
    req.body;
  expensesDB.addHousingExpense(
    userId,
    bankAccountNum,
    description,
    amount,
    date,
    address,
    isRent,
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Error", error: err["sqlMessage"] });
      } else {
        res.status(200).send({ message: "Housing expense added" });
      }
    }
  );
};

const addTransportationExpense = (req, res) => {
  const { userId } = req.params;
  const { bankAccountNum, description, amount, date, mode } = req.body;
  expensesDB.addTransportationExpense(
    userId,
    bankAccountNum,
    description,
    amount,
    date,
    mode,
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Error", error: err["sqlMessage"] });
      } else {
        res.status(200).send({ message: "Transportation expense added" });
      }
    }
  );
};

const addFoodExpense = (req, res) => {
  const { userId } = req.params;
  const {
    bankAccountNum,
    description,
    amount,
    date,
    store,
    isDelivery,
    numItems,
    numMeals,
  } = expensesDB.addFoodExpense(
    userId,
    bankAccountNum,
    description,
    amount,
    date,
    store,
    isDelivery,
    numItems,
    numMeals,
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Error", error: err["sqlMessage"] });
      } else {
        res.status(200).send({ message: "Food expense added" });
      }
    }
  );
};

const addEntertainmentExpense = (req, res) => {
  const { userId } = req.params;
  const { bankAccountNum, description, amount, date, event } = req.body;
  expensesDB.addEntertainmentExpense(
    userId,
    bankAccountNum,
    description,
    amount,
    date,
    event,
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Error", error: err["sqlMessage"] });
      } else {
        res.status(200).send({ message: "Entertainment expense added" });
      }
    }
  );
};

const addPersonalCareExpense = (req, res) => {
  const { userId } = req.params;
  const { bankAccountNum, description, amount, date, item } = req.body;
  expensesDB.addPersonalCareExpense(
    userId,
    bankAccountNum,
    description,
    amount,
    date,
    item,
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Error", error: err["sqlMessage"] });
      } else {
        res.status(200).send({ message: "Personal care expense added" });
      }
    }
  );
};

const updateHousingExpense = (req, res) => {
  const { id, userId } = req.params;
  const { bankAccountNum, description, amount, date, address, isRent } =
    req.body;
  expensesDB.updateHousingExpense(
    id,
    userId,
    bankAccountNum,
    description,
    amount,
    date,
    address,
    isRent,
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Error", error: err["sqlMessage"] });
      } else {
        res.status(200).send({ message: "Housing expense updated" });
      }
    }
  );
};

const updateTransportationExpense = (req, res) => {
  const { id, userId } = req.params;
  const { bankAccountNum, description, amount, date, mode } = req.body;
  expensesDB.updateTransportationExpense(
    id,
    userId,
    bankAccountNum,
    description,
    amount,
    date,
    mode,
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Error", error: err["sqlMessage"] });
      } else {
        res.status(200).send({ message: "Transportation expense updated" });
      }
    }
  );
};

const updateFoodExpense = (req, res) => {
  const { id, userId } = req.params;
  const {
    bankAccountNum,
    description,
    amount,
    date,
    store,
    isDelivery,
    numItems,
    numMeals,
  } = req.body;
  expensesDB.updateFoodExpense(
    id,
    userId,
    bankAccountNum,
    description,
    amount,
    date,
    store,
    isDelivery,
    numItems,
    numMeals,
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Error", error: err["sqlMessage"] });
      } else {
        res.status(200).send({ message: "Food expense updated" });
      }
    }
  );
};

const updateEntertainmentExpense = (req, res) => {
  const { id, userId } = req.params;
  const { bankAccountNum, description, amount, date, event } = req.body;
  expensesDB.updateEntertainmentExpense(
    id,
    userId,
    bankAccountNum,
    description,
    amount,
    date,
    event,
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Error", error: err["sqlMessage"] });
      } else {
        res.status(200).send({ message: "Entertainment expense updated" });
      }
    }
  );
};

const updatePersonalCareExpense = (req, res) => {
  const { id, userId } = req.params;
  const { bankAccountNum, description, amount, date, item } = req.body;
  expensesDB.updatePersonalCareExpense(
    id,
    userId,
    bankAccountNum,
    description,
    amount,
    date,
    item,
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Error", error: err["sqlMessage"] });
      } else {
        res.status(200).send({ message: "Personal care expense updated" });
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
  addHousingExpense,
  addTransportationExpense,
  addFoodExpense,
  addEntertainmentExpense,
  addPersonalCareExpense,
  updateHousingExpense,
  updateTransportationExpense,
  updateFoodExpense,
  updateEntertainmentExpense,
  updatePersonalCareExpense,
};
