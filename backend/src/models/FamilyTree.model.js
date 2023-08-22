import mongoose from "mongoose";

const familyTreeSchema = new mongoose.Schema({
  root: { type: mongoose.Schema.Types.ObjectId, ref: "FamilyMember" },
});

const FamilyTree = mongoose.model("FamilyTree", familyTreeSchema);

export default FamilyTree;
