import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { isValidObjectId } from "mongoose";


import User from "../models/User.model.js";

export const signUpUser = async (req, res, next) => {
  // Validate user input of dates
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errorsArray = validationErrors.array();
    const errObj = {
      message: "Validation Error",
      error: errorsArray,
    };

    return res.status(422).json(errObj);
  }

  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({
      email: email,
    });

    if (existingUser) {
      return res.status(422).json({
        message: "User exists",
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

    res.status(201).json({
      message: "User Created",
    });
  } catch (error) {
    res.status(500).json({ error: "An error occured while creating a user." });
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    // If user is not found
    if (!user) {
      return res.status(401).json({
        error: "User does not exist",
      });
    }

    // Compare the provided password with the stored hashed password
    const matches = await bcrypt.compare(password, user.password);

    if (!matches) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    // TODO: Implement JWT authentication

    res.status(200).json({
      userId: user._id.toString(),
      accessPermissions: user.accessPermissions,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occured while logging in." });
  }
};

export const listUsers = async (req, res, next) => {
  try {
    // Fetch all users from the database, excluding the password field
    const users = await User.find({}, { password: 0 });

    if (users.length === 0) {
      // No users found
      res.status(404).json({ error: "No users found." });
    } else {
      // Respond with the list of users
      res.status(200).json(users);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching all users." });
  }
};

export const changeUserPermissions = async (req, res, next) => {
  try {
    const usersToUpdate = req.body;

    // Fetch valid permissions values from the User schema
    const validPermissions = User.schema.path("accessPermissions").enumValues;

    // Loop through list of users to update their permissions
    for (const userToUpdate of usersToUpdate) {
      const userId = userToUpdate._id;

       // Check if the userId has a valid ObjectId format
       if (!isValidObjectId(userId)) {
        return res.status(400).json({ error: "Invalid user ID format." });
      }

      const newPermissions = userToUpdate.accessPermissions;

      // Check if permissions value provided is valid
      if (!validPermissions.includes(newPermissions)) {
        return res.status(400).json({
          error: `Invalid accessPermissions value: ${newPermissions}`,
        });
      }

      const user = await User.findById(userId);

      // Check if user exists
      if (!user) {
        res.status(404).json({ error: `Cannot find user with ID ${userId}` });
      } else {
        user.accessPermissions = newPermissions;
      }

      await user.save();
    }

    res.status(200).json({ message: "User permissions updated." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while changing user permissions." });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    // Check if the userId has a valid ObjectId format
    if (!isValidObjectId(userId)) {
        return res.status(400).json({ error: "Invalid user ID format." });
    }
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ error: `Cannot find user with ID ${userId}` });
    }

    await user.deleteOne();
    res.status(204).json({ message: "User deleted." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting a user." });
    console.log(error);
  }
};