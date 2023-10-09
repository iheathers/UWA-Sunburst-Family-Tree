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

familyMemberRouter.get("/:id", getFamilyMember);

familyMemberRouter.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("birthDate").isDate().withMessage("Invalid date format").optional(),
    body("deathDate").isDate().withMessage("Invalid date format").optional(),
  ],
  uploadFile,
  addFamilyMember
);

familyMemberRouter.patch(
  "/:id/edit",
  uploadFile,
  body("name").trim().notEmpty().withMessage("Name is required"),
  editFamilyMemberDetails
);

familyMemberRouter.patch("/:id", removeFromChart);

familyMemberRouter.delete("/:id", deleteFamilyMember);

export default familyMemberRouter;
