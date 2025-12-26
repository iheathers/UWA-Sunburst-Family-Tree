import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import familyTreeRouter from "./routes/FamilyTree.route.js";
import familyMemberRouter from "./routes/FamilyMember.route.js";
import userRouter from "./routes/User.route.js";
import commentRouter from "./routes/Comment.route.js";
import individualRouter from "./routes/Individual.route.js";
import suggestRouter from "./routes/Suggest.route.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/family-member", familyMemberRouter);

app.use("/api/family-tree", familyTreeRouter);

app.use("/api/user", userRouter);

app.use("/api/comment", commentRouter)

app.use("/api/individual", individualRouter)

app.use("/api/suggest", suggestRouter)

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb+srv://2217718:10295927@cluster0.wh49uil.mongodb.net/?retryWrites=true&w=majority')
  .then(
    app.listen(process.env.PORT || 8081, () => {
      console.log(`App listening on port`);

    })
  )
  .catch((err) => {
    console.log({ err });
  });
