import express from "express";
import {
  addComment,
  getComment,
  updateComment,
  deleteComment,
} from "../controllers/Comment.controller.js";


const commentRouter = express.Router();


commentRouter.get("/:id", getComment);
commentRouter.post("/", addComment);
commentRouter.put("/:id", updateComment);
commentRouter.delete("/:id", deleteComment);

export default commentRouter;