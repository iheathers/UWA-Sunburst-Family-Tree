import express from "express";

import { body } from "express-validator";

import {
  addFamilyMember,
  getFamilyMember,
  editFamilyMemberDetails,
  removeFromChart,
  deleteFamilyMember,
} from "../controllers/FamilyMember.controller.js";

const familyMemberRouter = express.Router();

// GET a family member by ID
familyMemberRouter.get("/:id", getFamilyMember);

familyMemberRouter.post(
  "/",
  [
    body("birthDate").isDate().optional(),
    body("deathDate").isDate().optional(),
  ],
  addFamilyMember
);

familyMemberRouter.patch("/:id/edit", editFamilyMemberDetails);

familyMemberRouter.patch("/:id", removeFromChart);

familyMemberRouter.delete("/:id", deleteFamilyMember);

export default familyMemberRouter;
