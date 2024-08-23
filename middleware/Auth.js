const jwt = require("jsonwebtoken");
const User = require("../modal/User");

// Middleware for authorization
const authorizeUser = async (req, res, next) => {
  console.log("req.headers", req.headers);

  try {
    // Get token from header
    let token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized User" });
    }

    console.log("-----> Autorize User <----");

    // Set user id in request
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

module.exports = { authorizeUser };
