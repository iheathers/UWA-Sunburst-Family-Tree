require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

app.use((error, req, res, next) => {
  console.log("Global error handling function", { error });

  const statusCode = error.statusCode || 500;
  const message = error.message;

  res.status(statusCode).json({
    statusCode,
    message,
  });
});

console.log(process.env);

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
