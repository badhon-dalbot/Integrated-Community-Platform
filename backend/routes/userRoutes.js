const express = require("express");
const jwt = require("jsonwebtoken");
const checkLogin = require("../middleware/middleware");

const userRoute = express.Router();

userRoute.get("/profile", checkLogin, (req, res) => {
  const { username } = req.user;
  // console.log(userId);
  console.log(username);
  if (!username) return res.status(400).json({ error: "user id required" });

  const query = `SELECT user_id, full_name, username, email FROM users WHERE username = ?`;
  db.query(query, [username], (err, results) => {
    if (err || results.length === 0) {
      res.status(500).json({ error: "Failed to fetch user data" });
    }

    const user = results[0];
    res.json({
      userId: user.user_id,
      username: user.username,
      fullName: user.name,
      email: user.email,
    });
  });
});

module.exports = userRoute;
