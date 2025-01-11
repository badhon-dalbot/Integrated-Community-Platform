const express = require("express");
const checkLogin = require("../middleware/middleware");
const db = require("../database");

const userRoute = express.Router();

userRoute.get("/profile", checkLogin, (req, res) => {
  // const { username } = req.params;
  const { id } = req.user;
  console.log(req.user);
  // console.log(req.params);
  // console.log(username);
  res.json({ message: "welcome to dashboard", user: req.user });
  // console.log("from user route: ", user);
  // if (!username) return res.status(400).json({ error: "user id required" });

  const query = `SELECT * FROM users WHERE  id = ?`;
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Failed to fetch user data" });
    }

    // const user = results;
    console.log("user profile ", results);
    // res.send(user);
    res.json(results);
  });
});

module.exports = userRoute;
