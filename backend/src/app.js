import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import familyTreeRouter from "./routes/FamilyTree.route.js";
import familyMemberRouter from "./routes/FamilyMember.route.js";
import userRouter from "./routes/User.route.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/family-member", familyMemberRouter);

app.use("/api/family-tree", familyTreeRouter);

app.use("/api/user", userRouter);

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(
    app.listen(process.env.PORT, () => {
      console.log("App listening on port 8080");
    })
  )
  .catch((err) => {
    console.log({ err });
  });
