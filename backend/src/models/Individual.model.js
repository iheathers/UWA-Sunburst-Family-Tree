import mongoose from "mongoose";

const individualSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    dayOfBirth: {
      type: String,
      required: true,
    },
    dayOfDeath: {
      type: String,
    },
    occupation: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
);

const Individual = mongoose.model("Individual", individualSchema);

export default Individual;
