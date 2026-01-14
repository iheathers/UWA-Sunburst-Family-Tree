import mongoose from "mongoose";

const suggestSchema = new mongoose.Schema(
  {
    time: {
      type: Date,
      default: Date.now,
    },
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "FamilyMember", 
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
  }
);

const Suggest = mongoose.model("Suggest", suggestSchema);

export default Suggest;

