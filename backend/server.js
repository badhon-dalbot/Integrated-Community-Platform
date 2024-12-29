const express = require('express');
const mysql = require('mysql');
const path = require('path'); // Add path module
const db = require('./database'); // Import the database connection
const app = express();
const port = 3000;

// Middleware to parse incoming requests
app.use(express.json());  // To parse JSON bodies
app.use(express.urlencoded({ extended: true }));  // To parse URL-encoded bodies

// Middleware to serve static files
app.use(express.static(path.join(__dirname, '../frontend'))); // This serves files from the frontend folder

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html')); // Serve the index.html file
});

// Login API route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ error: 'An error occurred. Please try again.' });
    }

    if (results.length > 0) {
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});

// Registration API route
app.post('/api/register', (req, res) => {
  const { name, username, email, password, phone, address, role } = req.body;

  // Validation (Optional)
  if (!name || !username || !email || !password || !phone || !address || !role) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Ensure username is unique
  const checkQuery = 'SELECT * FROM users WHERE username = ?';
  db.query(checkQuery, [username], (err, results) => {
    if (err) {
      console.error('Error checking username:', err);
      return res.status(500).json({ error: 'An error occurred. Please try again.' });
    }

    if (results.length > 0) {
      return res.status(409).json({ error: 'Username already exists. Please choose another one.' });
    }

    // Insert user into the database
    const query = 'INSERT INTO users (name, username, email, password, phone, address, role) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [name, username, email, password, phone, address, role], (err, results) => {
      if (err) {
        console.error('Error during registration:', err);
        return res.status(500).json({ error: 'An error occurred. Please try again.' });
      }

      return res.status(200).json({ message: 'Registration successful' });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
