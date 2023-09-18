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
    return res
      .status(422)
      .json({ error: "Validation Error", errors: errorsArray });
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

    // Check if the parentId has a valid ObjectId format
    if (!isValidObjectId(parentId)) {
      return res.status(400).json({ error: "Invalid parent ID format." });
    }

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
      parent,
      birthDate,
      deathDate,
      location,
      occupation,
      about,
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
      console.log(error)
  }
};

export const editFamilyMemberDetails = async (req, res, next) => {
  try {
    const memberId = req.params.id;

    // Is there a way to use the getFamilyMember function within this function to produce familyMember?
    // Check if memberId has a valid ObjectId format
    if (!isValidObjectId(memberId)) {
      return res
        .status(400)
        .json({ error: "Invalid family member ID format." });
    }

    const familyMember = await FamilyMember.findById(memberId);

    // Check if family member exists
    if (!familyMember) {
      return res.status(404).json({ error: "Family member not found." });
    }

    const { name, birthDate, deathDate, location, occupation, about } =
      req.body;

    // TO DO: Validate input data

    familyMember.name = name;
    familyMember.birthDate = birthDate;
    familyMember.deathDate = deathDate;
    familyMember.location = location;
    familyMember.occupation = occupation;
    familyMember.about = about;

    await familyMember.save();
    res.status(200).json({ message: "Family member's details updated." });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "An error occurred while editing a family member's details.",
      });
  }
};

export const removeFromChart = async (req, res, next) => {
  try {
    const memberId = req.params.id;

    // Is there a way to use the getFamilyMember function within this function to produce familyMember?
    // Check if memberId has a valid ObjectId format
    if (!isValidObjectId(memberId)) {
      return res
        .status(400)
        .json({ error: "Invalid family member ID format." });
    }

    const familyMember = await FamilyMember.findById(memberId);

    // Check if family member exists
    if (!familyMember) {
      return res.status(404).json({ error: "Family member not found." });
    }

    const childrenIds = familyMember.children;

    // If there are no children, remove from chart
    if (childrenIds.length === 0) {
      familyMember.displayOnChart = false;
      await familyMember.save();
      return res
        .status(200)
        .json({ message: "Family member removed from chart." });
    }

    // Get children displayed on chart
    const childrenOnChart = await FamilyMember.find({
      _id: { $in: childrenIds }, // should this be _id or id?
      displayOnChart: true,
    });

    // Remove from chart if there are no children displayed
    if (childrenOnChart.length === 0) {
      familyMember.displayOnChart = false;
      await familyMember.save();
      return res
        .status(200)
        .json({ message: "Family member removed from chart." });
    }

    // Do not remove from chart if there are children displayed
    return res
      .status(422)
      .json({
        error: "Family member not removed as children are still on chart.",
      });
  } catch (error) {
    res.status(500).json({ error: "An error occured while changing w" });
  }
};

export const deleteFamilyMember = async (req, res, next) => {
  try {
    const memberId = req.params.id;

    // Is there a way to use the getFamilyMember function within this function to produce familyMember?
    // Check if memberId has a valid ObjectId format
    if (!isValidObjectId(memberId)) {
      return res
        .status(400)
        .json({ error: "Invalid family member ID format." });
    }

    const familyMember = await FamilyMember.findById(memberId);

    // Check if family member exists
    if (!familyMember) {
      return res.status(404).json({ error: "Family member not found." });
    }

    // Check if the family member has no children
    if (!familyMember.children.length === 0) {
      return res
        .status(400)
        .json({ error: "Cannot delete a family member with children." });
    }

    await familyMember.deleteOne();
    res.status(204).json({ message: "Family member deleted." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting a family member." });
    console.log(error);
  }
};
