import { isValidObjectId } from "mongoose";
import { validationResult } from "express-validator";
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
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
      const errorsArray = validationErrors.array();
      const errObj = {
          message: "Validation Error",
          error: errorsArray,
      };

      return res.status(422).json(errObj);
  };

  try {
    const { name, parentId, birthDate, deathDate, location, occupation, about } = req.body;
    const parent = parentId ? await FamilyMember.findById(parentId) : null;

    const newMember = new FamilyMember({
      name,
      parent,
      birthDate, 
      deathDate, 
      location, 
      occupation, 
      about
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
      birthDate: birthDate,
      deathDate: deathDate,
      location: location,
      occupation: occupation,
      about: about,
    };

    res.status(201).json(newMemberJsonRes);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating a family member." });
  }
};

export const deleteFamilyMember = async (req, res, next) => {
  try {
    if (!res.familyMember) {
      return res.status(404).json({ error: "Family member not found." })
    };
    await res.familyMember.remove();
    res.status
  } catch (error) {
    res
      .status(500).
      json({ error: "An error occurred while deleting a family member." });
  }
};

export const editFamilyMemberDetails = async (req, res, next) => {
  try {
    // find family member
    // if does not exist, error
    // get request
    // save in database

  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while editing a family member's details." });
  }
};