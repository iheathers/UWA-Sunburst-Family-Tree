import mongoose from "mongoose";

const familyMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FamilyMember",
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FamilyMember",
    },
  ],
  birthDate: {
    type: Date,
  },
  deathDate: {
    type: Date,
  },
  location: {
    type: String,
  },
  occupation: {
    type: String,
  },
  about: {
    type: String,
  },
  displayOnChart: {
    type: Boolean,
    default: true,
  },
  imageUrl: {
    type: String,
  },
});

const FamilyMember = mongoose.model("FamilyMember", familyMemberSchema);

export default FamilyMember;
