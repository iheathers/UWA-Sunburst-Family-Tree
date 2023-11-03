import express from "express";
import {
  addIndividual,
  getIndividual,
  updateIndividual,
  deleteIndividual,
} from "../controllers/Individual.controller.js";


const individualRouter = express.Router();

// GET an individual by ID
individualRouter.get("/:id", getIndividual);
individualRouter.post("/", addIndividual);
individualRouter.put("/:id", updateIndividual);
individualRouter.delete("/:id", deleteIndividual);

export default individualRouter;
