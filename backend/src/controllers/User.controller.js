import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { isValidObjectId } from "mongoose";

import User from "../models/User.model.js";

export const signUpUser = async (req, res, next) => {
<<<<<<< HEAD
=======
  // Validate user input of dates
>>>>>>> f0d4923efea39801c8a0563396af14ddc0b376bd
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errorsArray = validationErrors.array();
    const errObj = {
<<<<<<< HEAD
      error: "Validation Error",
=======
      message: "Validation Error",
>>>>>>> f0d4923efea39801c8a0563396af14ddc0b376bd
      error: errorsArray,
    };

    return res.status(422).json(errObj);
  }

  const { email, password } = req.body;

  try {
<<<<<<< HEAD
=======
    // Check if the user already exists
>>>>>>> f0d4923efea39801c8a0563396af14ddc0b376bd
    const existingUser = await User.findOne({
      email: email,
    });

    if (existingUser) {
      return res.status(422).json({
        error: "User exists",
      });
    }

<<<<<<< HEAD
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

=======
    const saltRounds = 10; // would this be better stored in the .env file?
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user with hashed password
>>>>>>> f0d4923efea39801c8a0563396af14ddc0b376bd
    const newUser = new User({
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User Created",
    });
  } catch (error) {
<<<<<<< HEAD
    next(error);
=======
    res.status(500).json({ error: "An error occured while creating a user." });
>>>>>>> f0d4923efea39801c8a0563396af14ddc0b376bd
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

<<<<<<< HEAD
    if (!user) {
      return res.status(401).json({
        error: "Incorrect email or password",
      });
    }

=======
    // If user is not found
    if (!user) {
      return res.status(401).json({
        error: "User does not exist",
      });
    }

    // Compare the provided password with the stored hashed password
>>>>>>> f0d4923efea39801c8a0563396af14ddc0b376bd
    const matches = await bcrypt.compare(password, user.password);

    if (!matches) {
      return res.status(401).json({
<<<<<<< HEAD
        error: "Incorrect email or password",
      });
    }

    // JWT to be implemented
=======
        error: "Invalid credentials",
      });
    }

    // TODO: Implement JWT authentication
>>>>>>> f0d4923efea39801c8a0563396af14ddc0b376bd

    res.status(200).json({
      userId: user._id.toString(),
      accessPermissions: user.accessPermissions,
    });
  } catch (error) {
<<<<<<< HEAD
    next(error);
=======
    res.status(500).json({ error: "An error occured while logging in." });
>>>>>>> f0d4923efea39801c8a0563396af14ddc0b376bd
  }
};

export const listUsers = async (req, res, next) => {
<<<<<<< HEAD
  /*
    Fetch users from database
        User.find()
    If users found:
        Return successful response (200)
    Else:
        Return response indicating no users found
    Catch errors
    */
};

export const changeUserPermissions = async (req, res, next) => {
  /*
    Get userId and permission from request
    Find user - findById()
        If user not found, return response indicating cannot find user (404)
    Update user permission - save()
    If users permissions changed successful:
        Return successful response (200)
    Else:
        Return response indicating permission change failed
    Catch errors
    */
};

export const deleteUser = async (req, res, next) => {
  /*
    Find user and delete - findByIdAndDelete()
    If user not found, return response indicating cannot find user (404)
    Return successful response (204)
    Catch errors 
    */
=======
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
>>>>>>> f0d4923efea39801c8a0563396af14ddc0b376bd
};
