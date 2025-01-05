const express = require("express");
const mysql = require("mysql");
const cookie = require("cookie-parser");

const path = require("path"); // Add path module
const cors = require("cors");
const db = require("./database"); // Import the database connection
const userRoute = require("./routes/userRoutes");
const app = express();
const port = 3000;
const secretKey = "2c3f35b8a3988bed11689e3fc1aabe08064abd0d43";
const jwt = require("jsonwebtoken");

// Middleware to parse incoming requests
app.use(express.json()); // To parse JSON bodies
app.use(cors());
app.use(cookie());
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "../frontend"))); // This serves files from the frontend folder
//middlware

// Routes

app.use("user/", userRoute);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html")); // Serve the index.html file
});

// Login API route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  // const token = req.cookies.loggedInUser;

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
    //token
    const token = jwt.sign(user, secretKey, { expiresIn: "1d" });
    // res.json({ token });

    //set cookie
    res.cookie("integrated-community-service", token, {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      signed: true,
    });
    return res.redirect("/");

    // res.locals.loggedInUser = user;

    if (results.length > 0) {
      return res.status(200).json({ message: "Login successful" });
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  });
});

// Registration API route
app.post("/register", (req, res) => {
  const { username, name, email, password, phonenumber, city, district, division } =
    req.body;

  // Validation (Optional)
  if (
    !username ||
    !name ||
    !email ||
    !password ||
    !phonenumber ||
    !city ||
    !district ||
    !division
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
      "INSERT INTO users (username, name,  email, password, phonenumber, city, district, divison) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      query,
      [username, name, email, password, phonenumber, city, district, division],
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
