const jwt = require("jsonwebtoken");
const secretKey = "2c3f35b8a3988bed11689e3fc1aabe08064abd0d43";
const cookieParser = require("cookie-parser");

const checkLogin = (req, res, next) => {
  console.log("Cookies: ", req.cookies); // Log all cookies to check if the token is there
  console.log("Signed Cookies: ", req.signedCookies); // Log signed cookies

  // Check for token in signed cookies first
  const token = req.signedCookies.token || req.cookies.token;
  console.log("Token found in middleware: ", token); // Debugging line to check if token is found

  if (token) {
    try {
      const user = jwt.verify(token, secretKey); // Verify the token
      req.user = user; // Attach the user to the request object
      console.log("Decoded user from token: ", user); // Debugging line to see decoded user info
      next(); // Proceed to the next middleware or route
    } catch (err) {
      console.error("JWT verification error: ", err); // Error during verification
      res.status(500).json({ err: "Authentication failure" });
    }
    // const token = req.cookies.loggedInUser;
    // const token = req.cookies["integrated-community-platform"];
  }
};

module.exports = checkLogin;
