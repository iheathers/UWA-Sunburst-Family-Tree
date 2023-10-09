import mongoose from "mongoose";

const familyMemberSchema = new mongoose.Schema(
  {
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
  },
  imageUrl: {
    type: String,
  },
});
  {
    // Define schema options
    versionKey: false, // Exclude the '__v' field
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id; // Use 'id' instead of '_id' in the JSON output
        delete ret._id; // Remove '_id' from the JSON output
      },
    },
  }
);

const FamilyMember = mongoose.model("FamilyMember", familyMemberSchema);

export default FamilyMember;
