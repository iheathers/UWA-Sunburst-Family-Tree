import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import httpStatus from "./HttpStatus.util";

dotenv.config();

// Reads the authorization header on user requests to verify JWT tokens
export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res
      .status(httpStatus.UNAUTHORISED)
      .json({ error: "Authentication failed: No token provided." });
  }
  const token = authHeader.split(" ")[1];
  try {
    // Verify if token is valid
    const user = jwt.verify(token, process.env.SECRET_TOKEN);
    // Store user information in the request object for later use
    req.user = user;
    next();
  } catch (error) {
    res
      .status(httpStatus.UNAUTHORISED)
      .json({ error: "Authentication failed." });
  }
};
