import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { UNAUTHORISED } from "./HttpStatus.util.js";

dotenv.config();

// Reads the authorisation header on user requests to verify JWT tokens
export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(UNAUTHORISED)
      .json({ error: "Authentication failed: No token provided." });
  }
  try {
    const token = authHeader.split(" ")[1];
    // Verify if token is valid
    const user = jwt.verify(token, process.env.SECRET_TOKEN);
    // Store user information in the request object for later use
    req.user = user;
    next();
  } catch (error) {
    res.status(UNAUTHORISED).json({ error: "Authentication failed." });
  }
};
