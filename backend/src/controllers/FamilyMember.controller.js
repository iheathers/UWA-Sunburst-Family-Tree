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
    return res.status(422).json({ message: "Validation Error", errors: errorsArray });
  }

  try {
    const { 
      name, 
      parentId, 
      birthDate, 
      deathDate, 
      location, 
      occupation, 
      about,
    } = req.body;
    
    let parent = null;

    // Check if parentId is provided and not null
    if (parentId !== null) {
      parent = await FamilyMember.findById(parentId);

      if (!parent) {
        return res.status(404).json({ error: "Parent member not found." });
      }
    }

    if (parentId === null && (await FamilyMember.findOne({ parent: null }))) {
      return res.status(400).json({ error: "Only one root node is allowed." });
    }

    const newMember = new FamilyMember({
      name,
      parent: parentId !== null ? parent : null,
      birthDate, 
      deathDate, 
      location, 
      occupation, 
      about
    });

    await newMember.save();

    // If parent is specified, update the parent's children array
    if (parent) {
      parent.children.push(newMember);
      await parent.save();
    }
    res.status(201).json(newMember);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating a family member." });
  }
};

export const deleteFamilyMember = async (req, res, next) => {
  try {
    const memberId = req.params.id;
    
    // Check if memberId has a valid ObjectId format
    if (!isValidObjectId(memberId)) {
      return res.status(400).json({ error: "Invalid family member ID format." });
    }
    
    const familyMember = await FamilyMember.findById(memberId);
    
    // Check if family member exists
    if (!familyMember) {
      return res.status(404).json({ error: "Family member not found." })
    } 

    await familyMember.deleteOne();
    res.status(204).json({ message: "Family member deleted." })
  } catch (error) {
    res
      .status(500).
      json({ error: "An error occurred while deleting a family member." });
    console.log(error);
  }
};

export const editFamilyMemberDetails = async (req, res, next) => {
  try {
    // TODO: ---- 
    //  Step 1. find family member
    //  Step 2. if does not exist, error
    //  Step 3. get request
    //  Step 4. save in database

  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while editing a family member's details." });
  }
};