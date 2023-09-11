import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import User from "../models/User.model.js";

export const signUpUser = async (req, res, next) => {
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
        const existingUser = await User.findOne({ 
            email: email,
         });

        if (existingUser) {
            return res.status(422).json({
                message: "User exists",
            });
        }
        
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

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

export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ 
                error: "User does not exist",
            });
        }

        const matches = await bcrypt.compare (password, user.password);

        if (!matches) {
            return res.status(401).json({ 
                error: "Incorrect password",
             });
        }

        // JWT to be implemented

        res.status(200).json({
            userId: user._id.toString(),
            accessPermissions: user.accessPermissions
        });
    } catch (error) {
        next(error);
    }
};

export const listUsers = async (req, res, next) => {
    /*
    Fetch users from database
        User.find()
    If users found:
        Return successful response (200)
    Else:
        Return response indicating no users found
    Catch errors
    */
}

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
};