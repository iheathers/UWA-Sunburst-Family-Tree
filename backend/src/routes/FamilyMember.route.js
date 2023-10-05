import express from "express";
import { body } from "express-validator";

import {
  addFamilyMember,
  getFamilyMember,
  editFamilyMemberDetails,
  removeFromChart,
  deleteFamilyMember,
} from "../controllers/FamilyMember.controller.js";

import { authenticateToken } from "../utils/AuthenticateJWT.util.js";

const familyMemberRouter = express.Router();

familyMemberRouter.get("/:id", authenticateToken, getFamilyMember);

familyMemberRouter.post(
  "/",
  authenticateToken,
  [
    body("birthDate").isDate().optional(),
    body("deathDate").isDate().optional(),
  ],
  addFamilyMember
);

familyMemberRouter.patch(
  "/:id/edit",
  authenticateToken,
  editFamilyMemberDetails
);

familyMemberRouter.patch("/:id", authenticateToken, removeFromChart);

familyMemberRouter.delete("/:id", authenticateToken, deleteFamilyMember);

export default familyMemberRouter;
