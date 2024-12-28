const express = require("express");
const env = require("dotenv");
env.config();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./database.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

//Sign up
// app.post("/signup", async (req, res) => {
//   const { full_name, username, email, password, phone_number, address, role } =
//     req.body;

//   if (!username || !password || !full_name) {
//     return res.status(400).send("Required");
//   }

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const sql = `INSERT INTO users(full_name, username, email, password, phone_number, address, role) VALUES(?, ?, ?, ?, ?, ?, ?)`;
//     db.query(
//       sql,
//       [
//         full_name,
//         username,
//         email,
//         hashedPassword,
//         phone_number,
//         address,
//         role || "member",
//       ],
//       (err, result) => {
//         if (err) {
//           if (err.code == "ER_DUP_ENTRY") {
//             return res.status(409).send("username already exists.");
//           }
//           return res.status(500).send("Database error.");
//         }
//         res.status(201).send("User registered succesfully.");
//       }
//     );
//   } catch (error) {
//     res.status(500).send("server error.");
//   }
// });

// login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required.");

    const sql = `SELECT * FROM users WHERE username = ?`;

    db.query(sql, [username], async (err, results) => {
      if (err) return res.status(500).send("Database error.");
      if (results.length === 0)
        return res.status(401).send("Invalid username or password.");

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).send("Invalid username or password.");
      }

      const token = jwt.sign(
        { user_id: user.user_id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).send({ message: "Login successful.", token });
    });
  }
});

app.listen(port, () => {
  console.log(` app listening on port ${port}`);
});
