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
    body("birthDate").isDate().optional(),
    body("deathDate").isDate().optional(),
  ],
  uploadFile,
  addFamilyMember
);

familyMemberRouter.patch("/:id/edit", uploadFile, editFamilyMemberDetails);

familyMemberRouter.patch("/:id", removeFromChart);

familyMemberRouter.delete("/:id", deleteFamilyMember);

export default familyMemberRouter;
