import express from "express";
import mongoose from "mongoose";

import UserActionModel from "./moduls/UserAction.js";
import cors from "cors";

mongoose.connect("mongodb+srv://javascript:practise1052@cluster0.zlajbgs.mongodb.net/cryptodb?retryWrites=true&w=majority");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/userAction", async (req, res) => {
  const userAction = req.body;

  const newUserAction = new UserActionModel(userAction);
  await newUserAction.save();
  res.json(userAction);
});

app.listen(3005, () => {
  console.log("ok");
});
