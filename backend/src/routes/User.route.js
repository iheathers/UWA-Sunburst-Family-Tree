import express from "express";
import { body } from "express-validator";

import {
  signUpUser,
  loginUser,
  listUsers,
  getUserPermission,
  changeUserPermissions,
  deleteUser,
} from "../controllers/User.controller.js";

const userRouter = express.Router();

userRouter.post(
  "/signup",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Invalid email entered")
      .escape(),
    body("password")
      .not()
      .isEmpty()
      .withMessage("Password cannot be empty")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters")
      .matches("[0-9]")
      .withMessage("Password must contain a number")
      .matches("[A-Z]")
      .withMessage("Password must contain an uppercase letter")
      .escape(),
  ],
  signUpUser
);

userRouter.post("/login", loginUser);

userRouter.get("/", listUsers);

userRouter.get("/permission/:id", getUserPermission);

userRouter.patch("/", changeUserPermissions);

userRouter.delete("/:id", deleteUser);

export default userRouter;
