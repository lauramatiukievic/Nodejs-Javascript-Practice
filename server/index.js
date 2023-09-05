import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserActionModel from "./models/UserAction.js";
import cors from "cors";

dotenv.config();

mongoose.connect(process.env.MONGODB_URL);

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3005;

app.post("/userAction", async (req, res) => {
  const userAction = req.body;

  const newUserAction = new UserActionModel(userAction);
  await newUserAction.save();
  res.json(userAction);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
