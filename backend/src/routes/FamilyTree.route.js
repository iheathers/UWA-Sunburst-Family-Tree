import express from "express";

import { getFamilyTree } from "../controllers/FamilyTree.controller.js";

import { authenticateToken } from "../utils/AuthenticateJWT.util.js";

const familyTreeRouter = express.Router();

familyTreeRouter.get("/", authenticateToken, getFamilyTree);

export default familyTreeRouter;
