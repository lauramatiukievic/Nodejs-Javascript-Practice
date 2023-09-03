import mongoose from "mongoose";

const UserActionSchema = new mongoose.Schema({
  actionType: {
    type: String,
    required: true,
  },
  actionValue: {
    type: String,
    required: true,
  },
});

const UserActionModel = mongoose.model("userActions", UserActionSchema);
export default UserActionModel;
