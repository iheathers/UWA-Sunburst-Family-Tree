import express from "express";
import {
  addFamilyMember,
  getFamilyMember,
  updateFamilyMember,
  deleteFamilyMember,
} from "../controllers/FamilyMember.controller.js";

const familyMemberRouter = express.Router();

// GET a family member by ID
familyMemberRouter.get("/:id", getFamilyMember);
familyMemberRouter.post("/", addFamilyMember);
familyMemberRouter.put("/:id", updateFamilyMember);
familyMemberRouter.delete("/:id", deleteFamilyMember);

export default familyMemberRouter;
