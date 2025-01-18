const express = require("express");
const db = require("../database");

const userRoute = express.Router();

userRoute.get("/profile/:username", (req, res) => {
  const { username } = req.params;

  const userQuery = `SELECT * FROM users WHERE username = ?`;
  db.query(userQuery, [username], (err, userResults) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch user data" });
    }
    if (userResults.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    // console.log("User profile:", results[0]);
    const user = userResults[0];
    console.log("User found:", user);

    // Query to count Lost & Found items (found and lost items)
    const lostFoundQuery = `SELECT COUNT(*) AS lostFoundCount FROM lost_item UNION SELECT COUNT(*) AS lostFoundCount FROM found_item`;
    db.query(lostFoundQuery, (err, lostFoundResults) => {
      if (err) {
        console.error("Error fetching lost and found data:", err); // Log the error
        return res
          .status(500)
          .json({ error: "Failed to fetch lost and found data" });
      }

      console.log("Lost and Found results:", lostFoundResults);

      // Check the results for lost and found
      const lostFoundCount =
        (lostFoundResults[0] ? lostFoundResults[0].lostFoundCount : 0) +
        (lostFoundResults[1] ? lostFoundResults[1].lostFoundCount : 0);

      // Query to count Marketplace listings
      const marketplaceQuery = `SELECT COUNT(*) AS marketplaceCount FROM buy_sell_item WHERE user_id = ?`;
      db.query(marketplaceQuery, [user.user_id], (err, marketplaceResults) => {
        if (err) {
          console.error("Error fetching marketplace data:", err); // Log the error
          return res
            .status(500)
            .json({ error: "Failed to fetch marketplace data" });
        }

        console.log("Marketplace results:", marketplaceResults);

        const marketplaceCount = marketplaceResults[0]
          ? marketplaceResults[0].marketplaceCount
          : 0;

        // Query to count Emergency Alerts
        const alertsQuery = `SELECT COUNT(*) AS alertsCount FROM emergency_alert WHERE admin_id = ? AND status = 'active'`;
        db.query(alertsQuery, [user.user_id], (err, alertsResults) => {
          if (err) {
            console.error("Error fetching emergency alerts data:", err); // Log the error
            return res
              .status(500)
              .json({ error: "Failed to fetch emergency alerts data" });
          }

          console.log("Emergency Alerts results:", alertsResults);

          const alertsCount = alertsResults[0]
            ? alertsResults[0].alertsCount
            : 0;

          // Query to count Events attending
          const eventsQuery = `SELECT COUNT(*) AS eventsCount FROM event WHERE organizer_id = ? `;
          db.query(eventsQuery, [user.user_id], (err, eventsResults) => {
            if (err) {
              console.error("Error fetching events data:", err); // Log the error
              return res
                .status(500)
                .json({ error: "Failed to fetch events data" });
            }

            console.log("Events results:", eventsResults);

            const eventsCount = eventsResults[0]
              ? eventsResults[0].eventsCount
              : 0;

            // Send the combined response
            res.json({
              user: user,
              activities: {
                lostAndFound: lostFoundCount,
                marketplace: marketplaceCount,
                alerts: alertsCount,
                events: eventsCount,
              },
            });
          });
        });
      });
    });
  });
});

userRoute.put("/profile", (req, res) => {
  const {
    username,
    fullName,
    phoneNumber,
    email,
    city,
    district,
    division,
    currentPassword,
    newPassword,
  } = req.body;

  // Check if all required fields are present
  if (
    !username ||
    !fullName ||
    !phoneNumber ||
    !email ||
    !city ||
    !district ||
    !division ||
    !currentPassword
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // First, retrieve the stored password for the user
  const checkPasswordQuery = "SELECT password FROM users WHERE username = ?";
  db.query(checkPasswordQuery, [username], (err, results) => {
    if (err) {
      console.error("Error checking password:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while checking the password." });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    const storedPassword = results[0].password;

    // Check if the provided currentPassword matches the stored password
    if (currentPassword !== storedPassword) {
      return res.status(401).json({ error: "Incorrect current password." });
    }

    // Optionally, check if password is provided and if it needs to be updated
    let updatePasswordQuery = "";
    if (newPassword) {
      // Include newPassword in the update query
      updatePasswordQuery = `, password = ?`;
    }

    // SQL query to update the user's data
    const query = `
      UPDATE users
      SET name = ?, phonenumber = ?, email = ?, city = ?, district = ?, division = ? ${updatePasswordQuery}
      WHERE username = ?`;

    const params = [fullName, phoneNumber, email, city, district, division];

    // If password update is included
    if (newPassword) {
      params.push(newPassword);
    }

    // Add the username as the final parameter for the WHERE clause
    params.push(username);

    // Run the query to update the database
    db.query(query, params, (err, results) => {
      if (err) {
        console.error("Error updating profile:", err);
        return res
          .status(500)
          .json({ error: "An error occurred while updating your profile." });
      }

      res.json({ message: "Profile updated successfully!" });
    });
  });
});

module.exports = userRoute;
