import express from "express";

import { getFamilyTree } from "../controllers/FamilyTree.controller.js";

const familyTreeRouter = express.Router();

familyTreeRouter.get("/", getFamilyTree);

export default familyTreeRouter;
