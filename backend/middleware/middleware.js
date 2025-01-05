const jwt = require("jsonwebtoken");
const secretKey = "2c3f35b8a3988bed11689e3fc1aabe08064abd0d43";

const checkLogin = (req, res, next) => {
  // const token = req.cookies.loggedInUser;
  // const token = req.cookies["integrated-community-platform"];
  const token = req.cookies.integratedCommunityPlatform;

  if (token) {
    // try {
    //   const decoded = jwt.verify(token, secretKey);
    //   req.user = decoded;

    //   if ((res, locals, html)) {
    //     res.locals.loggedInUser = decoded;
    //   }
    //   next();
    // } catch (err) {
    //   res.status(500).json({ err: "Authentication failure" });
    // }
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(500).json({ err: "Authentication failure" });
      }
      req.auth = decoded;
      req.token = token;
      next();
    });
  } else {
    return res.json({ err: "Your are not authenticated" });
  }
};

module.exports = checkLogin;
