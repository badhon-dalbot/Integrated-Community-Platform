const express = require("express");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const path = require("path"); // Add path module
const cors = require("cors");
const db = require("./database"); // Import the database connection
const app = express();
const port = 3000;
// const secretKey = "2c3f35b8a3988bed11689e3fc1aabe08064abd0d43";

// Middleware to parse incoming requests
app.use(express.json()); // To parse JSON bodies
app.use(cors());
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "../frontend"))); // This serves files from the frontend folder
//middlware
// const authenticateToken = (req, res, next) => {
//   // const token = req.headers("Authorization")?.replace("Bearer ", "");
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token)
//     return res.status(401).json({ error: "Access denied. No token provided" });

//   jwt.verify(token, secretKey, (err, decoded) => {
//     if (err) return res.status(403).json({ error: "invalid token" });

//     res.id = decoded.id;
//     next();
//   });
// };

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html")); // Serve the index.html file
});

// Login API route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err || results.length === 0) {
      console.error("Error during login:", err);
      return res
        .status(500)
        .json({ error: "An error occurred. Please try again." });
    }

    const user = results[0];
    res.json({
      message: "login successful",
      username: user.username,
    });

    // const token = jwt.sign({ id: userId }, secretKey, { expiresIn: "1h" });
    // res.json({ token });

    if (results.length > 0) {
      return res.status(200).json({ message: "Login successful" });
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  });
});

// Registration API route
app.post("/register", (req, res) => {
  const { full_name, username, email, password, phone_number, address, role } =
    req.body;

  // Validation (Optional)
  if (
    !full_name ||
    !username ||
    !email ||
    !password ||
    !phone_number ||
    !address ||
    !role
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Ensure username is unique
  const checkQuery = "SELECT * FROM users WHERE username = ?";
  db.query(checkQuery, [username], (err, results) => {
    if (err) {
      console.error("Error checking username:", err);
      return res
        .status(500)
        .json({ error: "An error occurred. Please try again." });
    }

    if (results.length > 0) {
      return res
        .status(409)
        .json({ error: "Username already exists. Please choose another one." });
    }

    // Insert user into the database
    const query =
      "INSERT INTO users (full_name, username,  email, password, phone_number, address, role) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(
      query,
      [full_name, username, email, password, phone_number, address, role],
      (err, results) => {
        if (err) {
          console.error("Error during registration:", err);
          return res
            .status(500)
            .json({ error: "An error occurred. Please try again." });
        }

        return res.status(200).json({ message: "Registration successful" });
      }
    );
  });
});

//profile
app.get("/user/profile", (req, res) => {
  // const userId = req.id;
  // console.log(userId);
  const { username } = req.query;
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
      fullName: user.full_name,
      email: user.email,
    });
  });
});

// Update user Profile
// app.put("/user/:id", (req, res) => {
//   const userId = req.params.id;
//   const { full_name, email } = req.body;
//   const query = "UPDATE users SET full_name = ?, email = ? WHERE id = ?";
//   db.query(query, [name, email, userId], (err) => {
//     if (err) {
//       res.status(500).json({ error: "Failed to update user data" });
//     } else {
//       res.json({ message: "User updated successfully" });
//     }
//   });
// });

//middlewire

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
