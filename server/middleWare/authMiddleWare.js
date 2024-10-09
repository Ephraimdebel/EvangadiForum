const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

// auth middleware

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Authentication invalid" });
  }
  try {
    const { username, user_id } = jwt.verify(authHeader, "secret");
    req.user = { username, user_id };
    next();
  } catch (err) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Authentication invalid" });
  }
}

module.exports = authMiddleware;
