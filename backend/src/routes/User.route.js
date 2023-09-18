import express from "express";
import { body } from "express-validator";

<<<<<<< HEAD
import { signUpUser, loginUser } from "../controllers/User.controller.js";
=======
import {
    signUpUser, 
    loginUser,
    listUsers,
    changeUserPermissions,
    deleteUser,
} from "../controllers/User.controller.js";
>>>>>>> f0d4923efea39801c8a0563396af14ddc0b376bd

const userRouter = express.Router();

userRouter.post(
  "/signup",
  [body("email").isEmail(), body("password").not().isEmpty()],
  signUpUser
);

userRouter.post("/login", loginUser);

<<<<<<< HEAD
export default userRouter;
=======
userRouter.get("/", listUsers);

userRouter.patch("/", changeUserPermissions);

userRouter.delete("/:id", deleteUser);

export default userRouter;
>>>>>>> f0d4923efea39801c8a0563396af14ddc0b376bd
