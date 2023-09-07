import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import User from "../models/User.model.js";

const signUpUser = async (req, res, next) => {
    console.log("Signing Up");

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const validationErrObj = new Error("Validation Error"); // why not change to errObj?
        validationErrObj.statuscode = 422;

        return next(validationErrObj);
    }

    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ 
            email: email,
         });

        if (existingUser) {
            return res.status(422).json({
                message: "User exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email: email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({
            message: "User Created",
        });
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            const errObj = new Error("User does not exist.");
            errObj.statusCode = 401;
            return next(errObj);
        }

        const matches = await bcrypt.compare (password, user.password);

        if (!matches) {
            const errObj = new Error("Incorrect Password");
            errObj.statusCode = 401;
            return next(errObj);
        }

        // JWT to be implemented

        res.status(200).json({
            userId: user._id.toString(),
        });
    } catch (error) {
        next(error);
    }
};

const listUsers = async (req, res, next) => {
    // check if any users
    // if no users, return error
    // return list
}

// user permissions
const changeUserPermissions = async (req, res, next) => {

};

// Delete user
const deleteUser = async (req, res, next) => {

};

export default { signUpUser, loginUser };