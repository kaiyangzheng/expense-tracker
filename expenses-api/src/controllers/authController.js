const expensesDB = require("../database/expensesDB");

const login = (req, res) => {
  const { name, password } = req.body;
  expensesDB.login(name, password, (err, results) => {
    if (err) {
      res.status(500).send({ message: "Error", error: err["sqlMessage"] });
    } else {
      if (results.length > 0) {
        res.status(200).send({
          message: "Logged in",
          userId: results[0].id,
          name: results[0].name,
        });
      } else {
        res
          .status(401)
          .send({ message: "Error", error: "Invalid credentials" });
      }
    }
  });
};

const signup = (req, res) => {
  const { name, password } = req.body;
  expensesDB.signup(name, password, (err, results) => {
    if (err) {
      res.status(500).send({ message: "Error", error: err["sqlMessage"] });
    } else {
      res.status(200).send({ message: "User created", userId: results[0].id });
    }
  });
};

module.exports = { login, signup };
