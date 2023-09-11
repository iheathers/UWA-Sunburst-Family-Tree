import express from "express";
import { body } from "express-validator";

import {
    signUpUser, 
    loginUser,
} from "../controllers/User.controller.js";

const userRouter = express.Router();

userRouter.post(
    "/signup",
    [
        body("email").isEmail(),
        body("password").not().isEmpty(),
    ],
    signUpUser
);

userRouter.post("/login", loginUser);


export default userRouter;