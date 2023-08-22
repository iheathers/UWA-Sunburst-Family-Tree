import mongoose from "mongoose";

const familyMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const FamilyMember = mongoose.model("FamilyMember", familyMemberSchema);

export default FamilyMember;
