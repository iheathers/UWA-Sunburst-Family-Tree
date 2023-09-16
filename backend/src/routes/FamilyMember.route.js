import express from "express";
import { body } from "express-validator";

import {
  addFamilyMember,
  getFamilyMember,
  removeFromChart,
  deleteFamilyMember,
} from "../controllers/FamilyMember.controller.js";

const familyMemberRouter = express.Router();

familyMemberRouter.get("/:id", getFamilyMember);

familyMemberRouter.post(
  "/",
  [
    body("birthDate").isDate().optional(),
    body("deathDate").isDate().optional(),
  ],
  addFamilyMember);

familyMemberRouter.patch("/:id", removeFromChart);

familyMemberRouter.delete("/:id", deleteFamilyMember);

export default familyMemberRouter;
