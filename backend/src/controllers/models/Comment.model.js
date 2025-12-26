import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    time: {
      type: Date,
      default: Date.now,
    },
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
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

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
