//get a suggest
import { isValidObjectId } from "mongoose";
import Suggest from "../models/Suggest.model.js";

export const getSuggest = async (req, res, next) => {
  try {
    const suggestId = req.params.id;

    // Check if the suggestId has a valid ObjectId format
    if (!isValidObjectId(suggestId)) {
      return res.status(400).json({ error: "Invalid suggest ID format." });
    }

    const suggest = await Suggest.findById(suggestId);

    if (!suggest) {
      // If the suggest with the given ID is not found, return a 404 response with a custom error message
      return res.status(404).json({ error: "Suggest not found." });
    }

    // If the suggest is found, return it as JSON
    res.json(suggest);
  } catch (error) {
    // Handle other errors and respond with a 500 status code and an error message
    res
      .status(500)
      .json({ error: "An error occurred while fetching the suggest." });
  }
};
//add a suggest

export const addSuggest = async (req, res, next) => {
  try {
    const { author, content } = req.body;

    const newSuggest = new Suggest({
      author,
      content,
    });

    await newSuggest.save();

   
    const newSuggestJsonRes = {
      id: newSuggest.id,
      author: newSuggest.author,
      content: newSuggest.content,
      time: newSuggest.time,
    };

    res.json(newSuggestJsonRes);
  } catch (error) {
    console.error("Database error:", error)
    // Handle errors and respond with a 500 status code and an error message
    res.status(500).json({ error: "An error occurred while saving the suggestion." });
  }
};

// update

export const updateSuggest = async (req, res, next) => {
  try {
    const suggestId = req.params.id;

    // Check if the suggestId has a valid ObjectId format
    if (!isValidObjectId(suggestId)) {
      return res.status(400).json({ error: "Invalid suggest ID format." });
    }

    // Find the suggest by ID
    const suggest = await Suggest.findById(suggestId);

    if (!suggest) {
      return res.status(404).json({ error: "Suggest not found." });
    }

    // Update the suggest's properties
    suggest.author = req.body.author; // Update other properties as needed
    // Save the updated suggest
    await suggest.save();

    // Return the updated suggest as JSON
    res.json(suggest);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the suggest." });
  }
};

// delete

export const deleteSuggest = async (req, res, next) => {
    try {
      const suggestId = req.params.id;
  
      // Check if the suggestId has a valid ObjectId format
      if (!isValidObjectId(suggestId)) {
        return res.status(400).json({ error: "Invalid suggest ID format." });
      }
  
      // Find the suggest by ID
      const suggest = await Suggest.findById(suggestId);
  
      if (!suggest) {
        return res.status(404).json({ error: "Suggest not found." });
      }
  
    const deletedSuggest = await Suggest.findByIdAndRemove(suggestId);

    if (!deletedSuggest) {
      return res.status(404).json({ error: "Suggest not found." });
    }

    // Customize the response as needed
    res.json({ message: "Suggest deleted successfully." });
    } catch (error) {
      console.error("Database error:", error)
      res
        .status(500)
        .json({ error: "An error occurred while deleting the suggest." });
    }
  };







