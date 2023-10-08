import mongoose from "mongoose";

const suggestSchema = new mongoose.Schema(
  {
    time: {
      type: Date,
      default: Date.now,
    },
    author: {
      id: {
        type: String,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    content: {
      type: String,
      required: true,
    },
  },
  
);

const Suggest = mongoose.model("Suggest", suggestSchema);

export default Suggest;
