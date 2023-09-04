import express from "express";

import {
  addFamilyMember,
  getFamilyMember,
} from "../controllers/FamilyMember.controller.js";

const familyMemberRouter = express.Router();

familyMemberRouter.get("/:id", getFamilyMember);

familyMemberRouter.post("/", addFamilyMember);

export default familyMemberRouter;
