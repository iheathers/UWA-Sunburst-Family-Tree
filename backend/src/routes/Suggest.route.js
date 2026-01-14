import express from "express";
import {
  addSuggest,
  getSuggest,
  updateSuggest,
  deleteSuggest,
} from "../controllers/Suggest.controller.js";


const suggestRouter = express.Router();


suggestRouter.get("/:id", getSuggest);
suggestRouter.post("/", addSuggest);
suggestRouter.put("/:id", updateSuggest);
suggestRouter.delete("/:id", deleteSuggest);

export default suggestRouter;