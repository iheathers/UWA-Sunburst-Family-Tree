import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        accessPermissions: { 
            type: String,
            default: "chart",
            enum: ["chart", "bio", "admin"],
        },
    },
);

const User = mongoose.model("User", userSchema);

export default User;