import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";

import familyMemberRouter from "./routes/FamilyMember.route.js";

const app = express();

app.use(express.json());

app.use("/api/family-member", familyMemberRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(
    app.listen(process.env.PORT, () => {
      console.log("App listening on port 8080");
    })
  )
  .catch((err) => {
    console.log({ err });
  });
