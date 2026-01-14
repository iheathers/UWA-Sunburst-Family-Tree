import express from "express";

import { body } from "express-validator";

import {
  addFamilyMember,
  getFamilyMember,
  editFamilyMemberDetails,
  removeFromChart,
  deleteFamilyMember,
} from "../controllers/FamilyMember.controller.js";

import { uploadFile } from "../utils/UploadImage.util.js";

const familyMemberRouter = express.Router();

// GET a family member by ID
familyMemberRouter.get("/:id", getFamilyMember);

familyMemberRouter.post(
  "/",
  uploadFile,
  [
    body("name").trim().not().isEmpty().withMessage("Name is required"),
    body("birthDate").isDate().withMessage("Invalid date format").optional(),
    body("deathDate").isDate().withMessage("Invalid date format").optional(),
  ],
  addFamilyMember
);

familyMemberRouter.patch(
  "/:id/edit",
  uploadFile,
  [
    body("name")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Name is required")
      .optional(),
    body("birthDate").isDate().withMessage("Invalid date format").optional(),
    body("deathDate").isDate().withMessage("Invalid date format").optional(),
  ],
  editFamilyMemberDetails
);

familyMemberRouter.patch("/:id", removeFromChart);

familyMemberRouter.delete("/:id", deleteFamilyMember);

export default familyMemberRouter;
