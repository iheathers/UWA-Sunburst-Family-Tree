import FamilyMember from "../models/FamilyMember.model.js";

export const getFamilyMember = async (req, res, next) => {
  // try {
  //   const posts = await FamilyMember.find();

  //   if (!posts.length) {
  //     throw new Error("Could not fetch posts");
  //   }

  //   res.status(200).json({
  //     posts,
  //   });
  // } catch (error) {
  //   next(error);
  // }

  try {
    console.log("FamilyMember Controller");

    res.status(200).json({
      name: "Name",
    });
  } catch (error) {
    next(error);
  }
};

export const addFamilyMember = async (req, res, next) => {
  try {
    const { name } = req.body;

    const familyMember = new FamilyMember({
      name: name,
    });

    await familyMember.save();

    res.status(201).json({
      message: "Add family member Success",
      name: name,
    });
  } catch (error) {
    next(error);
  }
};
