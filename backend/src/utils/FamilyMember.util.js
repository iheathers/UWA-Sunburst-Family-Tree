const BAD_REQUEST = 400; // Remove once branch CITS5206-#135 is merged
// import { BAD_REQUEST } from "../utils/HttpStatus.util.js"; // Add once branch CITS5206-#135 is merged

export const validateDateRange = (birthDate, deathDate, res) => {
  if (birthDate && deathDate && new Date(birthDate) > new Date(deathDate)) {
    return res
      .status(BAD_REQUEST)
      .json({ error: "Birth date cannot be greater than death date." });
  }
};
