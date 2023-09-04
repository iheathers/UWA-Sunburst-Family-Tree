import { isValidObjectId } from "mongoose";
import FamilyMember from "../models/FamilyMember.model.js";

export const getFamilyMember = async (req, res, next) => {
  try {
    const memberId = req.params.id;

    // Check if the memberId has a valid ObjectId format
    if (!isValidObjectId(memberId)) {
      return res.status(400).json({ error: "Invalid member ID format." });
    }

    const familyMember = await FamilyMember.findById(memberId);

    if (!familyMember) {
      // If the family member with the given ID is not found, return a 404 response with a custom error message
      return res.status(404).json({ error: "Family member not found." });
    }

    // If the family member is found, return it as JSON
    res.json(familyMember);
  } catch (error) {
    // Handle other errors and respond with a 500 status code and an error message
    res
      .status(500)
      .json({ error: "An error occurred while fetching the family member." });
  }
};

export const addFamilyMember = async (req, res, next) => {
  try {
    const { name, parentId } = req.body;
    const parent = parentId ? await FamilyMember.findById(parentId) : null;

    const newMember = new FamilyMember({
      name,
      parent,
    });

    await newMember.save();

    if (parent) {
      parent.children.push(newMember);
      await parent.save();
    }

    const newMemberJsonRes = {
      id: newMember.id,
      name: newMember.name,
      parentId: parentId,
      children: newMember.children,
    };

    res.json(newMemberJsonRes);
  } catch (error) {
    // next(error)
    res
      .status(500)
      .json({ error: "An error occurred while creating a family member." });
  }
};
