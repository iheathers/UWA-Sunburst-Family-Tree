import FamilyMember from "../models/FamilyMember.model.js";
import { buildFamilyTree } from "../utils/FamilyTree.util.js";
import { INTERNAL_SERVER_ERROR } from "../utils/HttpStatus.util.js";

export const getFamilyTree = async (req, res, next) => {
  try {
    const allMembers = await FamilyMember.find({});
    const familyTree = buildFamilyTree(allMembers);
    res.json(familyTree);
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while fetching family members." });
  }
};
