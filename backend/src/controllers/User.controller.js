import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { isValidObjectId } from "mongoose";

import User from "../models/User.model.js";

import {
  OK,
  CREATED,
  NO_CONTENT,
  BAD_REQUEST,
  NOT_FOUND,
  UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR,
  UNAUTHORISED,
} from "../utils/HttpStatus.util.js";

dotenv.config();

export const signUpUser = async (req, res, next) => {
  // Validate user input of dates
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errorsArray = validationErrors.array();
    const errObj = {
      error: "Validation Error",
      error: errorsArray,
    };

    return res.status(UNPROCESSABLE_ENTITY).json(errObj);
  }

  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({
      email: email,
    });

    if (existingUser) {
      return res.status(UNPROCESSABLE_ENTITY).json({
        error: "User exists",
      });
    }

    const saltRounds = 10; // would this be better stored in the .env file?
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user with hashed password
    const newUser = new User({
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(CREATED).json({
      message: "User Created",
    });
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: "An error occured while creating a user." });
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    // If user is not found
    if (!user) {
      return res.status(UNAUTHORISED).json({
        error: "Incorrect email or password",
      });
    }

    // Compare the provided password with the stored hashed password
    const matches = await bcrypt.compare(password, user.password);

    if (!matches) {
      return res.status(UNAUTHORISED).json({
        error: "Incorrect email or password",
      });
    }

    // Generate JWT token on authentication
    const tokenPayload = {
      userId: user._id,
    };
    const jwtToken = await jwt.sign(tokenPayload, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });

    res.status(OK).json({
      token: jwtToken,
      // TODO: replace the below with just a success message?
      userId: user._id.toString(),
      accessPermissions: user.accessPermissions,
    });
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: "An error occured while logging in." });
  }
};

export const listUsers = async (req, res, next) => {
  try {
    // Fetch all users from the database, excluding the password field
    const users = await User.find({}, { password: 0 });

    if (users.length === 0) {
      // No users found
      res.status(NOT_FOUND).json({ error: "No users found." });
    } else {
      // Respond with the list of users
      res.status(OK).json(users);
    }
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while fetching all users." });
  }
};

export const changeUserPermissions = async (req, res, next) => {
  try {
    const usersToUpdate = req.body;
    const errors = [];

    // Fetch valid permissions values from the User schema
    const validPermissions = User.schema.path("accessPermissions").enumValues;

    // Loop through list of users to update their permissions
    for (const userToUpdate of usersToUpdate) {
      const userId = userToUpdate._id;

      // Check if the userId has a valid ObjectId format
      if (!isValidObjectId(userId)) {
        errors.push(`Invalid user ID format: ${userId}`);
        continue;
      }

      const newPermissions = userToUpdate.accessPermissions;

      // Check if permissions value provided is valid
      if (!validPermissions.includes(newPermissions)) {
        errors.push(`Invalid accessPermissions value: ${newPermissions}`);
        continue;
      }

      const user = await User.findById(userId);

      // Check if user exists
      if (!user) {
        errors.push(`Cannot find user with ID: ${userId}`);
        continue;
      } else {
        user.accessPermissions = newPermissions;
      }

      await user.save();
    }

    // Return any errors encountered
    if (errors.length > 0) {
      return res.status(BAD_REQUEST).json({ error: errors });
    }

    res.status(OK).json({ message: "User permissions updated." });
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while changing user permissions." });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Check if the userId has a valid ObjectId format
    if (!isValidObjectId(userId)) {
      return res.status(BAD_REQUEST).json({ error: "Invalid user ID format." });
    }

    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res
        .status(NOT_FOUND)
        .json({ error: `Cannot find user with ID ${userId}` });
    }

    await user.deleteOne();
    res.status(NO_CONTENT).json({ message: "User deleted." });
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while deleting a user." });
  }
};
