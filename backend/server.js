const express = require("express");
// const cookieParser = require("cookie-parser");
// const jwt = require("jsonwebtoken");
const path = require("path"); // Add path module
const cors = require("cors");
const db = require("./database"); // Import the database connection
const userRoute = require("./routes/userRoutes");
const app = express();
const port = 5000;
const secretKey = "2c3f35b8a3988bed11689e3fc1aabe08064abd0d43";
// app.use(cookieParser(secretKey))
const lostAndFoundRoute = require("./routes/lostAndFoundRout");
const events = require("./routes/eventsRouts");
const buyAndSell = require("./routes/buyAndSellRouts");
const emergencyAlert = require("./routes/emergencyAlertRouts");

// Middleware to parse incoming requests
app.use(express.json()); // To parse JSON bodies

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    Credentials: true,
  })
);

app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "../frontend"))); // This serves files from the frontend folder
//middlware
// app.use((req, res, next) => {
//   console.log("request cookies: ", req.cookies);
//   next();
// });
// Routes

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html")); // Serve the index.html file
});

// app.get("/profile.html", (req, res) => {
//   const username = req.query.username;
//   console.log(username);
//   res.sendFile(path.join(__dirname, "frontend", "profile.html"));
// });

// app.get("/user-dashboard/:username", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend", "user-dashboard.html"));
// });
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
    // const token = jwt.sign(
    //   { id: user.user_id, username: user.username },
    //   "yourSecretKey",
    //   { expiresIn: "1d" }
    // );

    // res.cookie("token", token, {
    //   expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    //   httpOnly: true,
    //   signed: true,

    // });

    res.json({
      message: "Login successful",
      user: user,
      // token: token,
    });
  });
});
// Registration API route
app.post("/register", (req, res) => {
  const {
    username,
    name,
    email,
    password,
    phonenumber,
    city,
    district,
    division,
  } = req.body;

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
app.use("/user", userRoute);

//lost and found

app.use("/lost-and-found", lostAndFoundRoute);

app.use("/events", events);
app.use("/buy-Sell", buyAndSell);
app.use("/emergency-alert", emergencyAlert);
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

app.get("/latest-updates", (req, res) => {
  const query = `SELECT 'Buy and Sell' AS source, item_id, item_name, description AS content, date_listed as created_at
FROM buy_sell_item
UNION ALL
SELECT 'Emergency Alert' AS source, alert_id, title, description AS content, time_issued as created_at
FROM emergency_alert
UNION ALL
SELECT 'Events' AS source, event_id, event_name AS title, description AS content, time as created_at
FROM event
UNION ALL
SELECT 'Found Items' AS source, found_item_id, item_name AS title, description AS content, date_found as created_at
FROM found_item
UNION ALL
SELECT 'Lost Item' AS source, lost_item_id, item_name AS title, description AS content, date_lost as created_at
FROM lost_item
ORDER BY created_at DESC
LIMIT 10;
`;
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Error fetching data from database");
      return;
    }
    console.log(results);
    res.status(200).json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
