import { isValidObjectId } from "mongoose";
import Comment from "../models/Comment.model.js";
// get
export const getComment = async (req, res, next) => {
  try {
    const commentId = req.params.id;

    // Check if the commentId has a valid ObjectId format
    if (!isValidObjectId(commentId)) {
      return res.status(400).json({ error: "Invalid comment ID format." });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      // If the comment with the given ID is not found, return a 404 response with a custom error message
      return res.status(404).json({ error: "Comment not found." });
    }

    // If the comment is found, return it as JSON
    res.json(comment);
  } catch (error) {
    // Handle other errors and respond with a 500 status code and an error message
    res
      .status(500)
      .json({ error: "An error occurred while fetching the comment." });
  }
};
// add
export const addComment = async (req, res, next) => {
    try {
      const { author, content } = req.body;
  
      const newComment = new Comment({
        author,
        content,
      });
  
      await newComment.save();
  
      // Customize the response format as needed
      const newCommentJsonRes = {
        id: newComment.id,
        time: newComment.time,
        author: newComment.author,
        content: newComment.content,
      };
  
      res.json(newCommentJsonRes);
    } catch (error) {
      // Handle errors and respond with a 500 status code and an error message
      res
        .status(500)
        .json({ error: "An error occurred while creating a comment." });
    }
  };
  //update
  export const updateComment = async (req, res, next) => {
    try {
      const commentId = req.params.id;
  
      // Check if the commentId has a valid ObjectId format
      if (!isValidObjectId(commentId)) {
        return res.status(400).json({ error: "Invalid comment ID format." });
      }
  
      // Find the comment by ID
      const comment = await Comment.findById(commentId);
  
      if (!comment) {
        return res.status(404).json({ error: "Comment not found." });
      }
  
      // Update the comment's properties
      comment.content = req.body.content; // Update other properties as needed
      // Save the updated comment
      await comment.save();
  
      // Return the updated comment as JSON
      res.json(comment);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while updating the comment." });
    }
  };
  // delete
  export const deleteComment = async (req, res, next) => {
    try {
      const commentId = req.params.id;
  
      // Check if the commentId has a valid ObjectId format
      if (!isValidObjectId(commentId)) {
        return res.status(400).json({ error: "Invalid comment ID format." });
      }
  
      // Find the comment by ID
      const comment = await Comment.findById(commentId);
  
      if (!comment) {
        return res.status(404).json({ error: "Comment not found." });
      }
  
      // Remove the comment
      await comment.remove();
  
      // You can customize the response as needed
      res.json({ message: "Comment deleted successfully." });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while deleting the comment." });
    }
  };
