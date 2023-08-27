import mongoose from "mongoose";

const familyMemberSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
});

const detailSchema = new mongoose.Schema({
  id: { type: Number, required: true, ref: "FamilyMember" }, // Change to 'FamilyMember'
  birthOfDay: { type: Date },
  deathOfDay: { type: Date },
  address: [{ type: String }],
  occupation: { type: String },
  phoneNumber: { type: String },
  email: { type: String },
});

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FamilyMember", // Change to 'FamilyMember'
    required: true,
  },
  date: { type: Date, default: Date.now },
  content: { type: String, required: true },
});

const adviseSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FamilyMember", // Change to 'FamilyMember'
    required: true,
  },
  date: { type: Date, default: Date.now },
  content: { type: String, required: true },
});

const FamilyMember = mongoose.model("FamilyMember", familyMemberSchema);
const Advise = mongoose.model("Advise", adviseSchema);
const Comment = mongoose.model("Comment", commentSchema);
const Detail = mongoose.model("Detail", detailSchema);

export default { FamilyMember, Comment, Advise, Detail };