import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose"
import familyMemberRouter from "./routes/FamilyMember.route.js";

const app = express();
app.use(express.json());
console.log(process.env.MONGODB_URI)

app.use("/api/family-member", familyMemberRouter);
// connect to mongodb
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`App listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Mongoose connection error:', err);
  });





