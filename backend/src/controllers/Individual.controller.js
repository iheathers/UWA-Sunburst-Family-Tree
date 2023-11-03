import { isValidObjectId } from "mongoose";
import Individual from "../models/Individual.model.js";
//get
export const getIndividual = async (req, res, next) => {
  try {
    const individualId = req.params.id;

    // Check if the individualId has a valid ObjectId format
    if (!isValidObjectId(individualId)) {
      return res.status(400).json({ error: "Invalid individual ID format." });
    }

    const individual = await Individual.findById(individualId);

    if (!individual) {
      // If the individual with the given ID is not found, return a 404 response with a custom error message
      return res.status(404).json({ error: "Individual not found." });
    }

    // If the individual is found, return it as JSON
    res.json(individual);
  } catch (error) {
    // Handle other errors and respond with a 500 status code and an error message
    res
      .status(500)
      .json({ error: "An error occurred while fetching the individual." });
  }
};
//add
export const addIndividual = async (req, res, next) => {
    try {
      const {
        id,
        dayOfBirth,
        dayOfDeath,
        occupation,
        phoneNumber,
        email,
        description,
      } = req.body;
  
      const newIndividual = new Individual({
        id,
        dayOfBirth,
        dayOfDeath,
        occupation,
        phoneNumber,
        email,
        description,
      });
  
      await newIndividual.save();
  
      // Customize the response format as needed
      const newIndividualJsonRes = {
        id: newIndividual.id,
        dayOfBirth: newIndividual.dayOfBirth,
        dayOfDeath: newIndividual.dayOfDeath,
        occupation: newIndividual.occupation,
        phoneNumber: newIndividual.phoneNumber,
        email: newIndividual.email,
        description: newIndividual.description,
      };
  
      res.json(newIndividualJsonRes);
    } catch (error) {
      // Handle errors and respond with a 500 status code and an error message
      res
        .status(500)
        .json({ error: "An error occurred while creating an individual." });
    }
  };
  // update
  export const updateIndividual = async (req, res, next) => {
    try {
      const individualId = req.params.id;
  
      // Check if the individualId has a valid ObjectId format
      if (!isValidObjectId(individualId)) {
        return res.status(400).json({ error: "Invalid individual ID format." });
      }
  
      // Find the individual by ID
      const individual = await Individual.findById(individualId);
  
      if (!individual) {
        return res.status(404).json({ error: "Individual not found." });
      }
  
      // Update the individual's properties
      individual.dayOfBirth = req.body.dayOfBirth; // Update other properties as needed
      // Save the updated individual
      await individual.save();
  
      // Return the updated individual as JSON
      res.json(individual);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while updating the individual." });
    }
  };
  //delete
  export const deleteIndividual = async (req, res, next) => {
    try {
      const individualId = req.params.id;
  
      // Check if the individualId has a valid ObjectId format
      if (!isValidObjectId(individualId)) {
        return res.status(400).json({ error: "Invalid individual ID format." });
      }
  
      // Find the individual by ID
      const individual = await Individual.findById(individualId);
  
      if (!individual) {
        return res.status(404).json({ error: "Individual not found." });
      }
  
      // Remove the individual
      await individual.remove();
  
      // Customize the response as needed
      res.json({ message: "Individual deleted successfully." });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while deleting the individual." });
    }
  };
