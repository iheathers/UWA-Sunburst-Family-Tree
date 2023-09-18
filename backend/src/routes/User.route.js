import express from "express";
import { body } from "express-validator";

import {
  signUpUser,
  loginUser,
  listUsers,
  changeUserPermissions,
  deleteUser,
} from "../controllers/User.controller.js";

const userRouter = express.Router();

userRouter.post(
  "/signup",
  [body("email").isEmail(), body("password").not().isEmpty()],
  signUpUser
);

userRouter.post("/login", loginUser);

userRouter.get("/", listUsers);

userRouter.patch("/", changeUserPermissions);

userRouter.delete("/:id", deleteUser);

export default userRouter;
