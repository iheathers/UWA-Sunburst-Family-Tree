import express from "express";
import { body } from "express-validator";

import {
  signUpUser,
  loginUser,
  listUsers,
  changeUserPermissions,
  deleteUser,
} from "../controllers/User.controller.js";

import { authenticateToken } from "../utils/AuthenticateJWT.1util.js";

const userRouter = express.Router();

userRouter.post(
  "/signup",
  [body("email").isEmail(), body("password").not().isEmpty()],
  signUpUser
);

userRouter.post("/login", loginUser);

userRouter.get("/", authenticateToken, listUsers);

userRouter.patch("/", authenticateToken, changeUserPermissions);

userRouter.delete("/:id", authenticateToken, deleteUser);

export default userRouter;
