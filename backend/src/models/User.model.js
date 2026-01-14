import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    default: "VIEW_CHART_ONLY",
    enum: ["VIEW_CHART_ONLY", "VIEW_CHART_AND_BIO", "ADMIN"],
  },
});

const User = mongoose.model("User", userSchema);

export default User;

