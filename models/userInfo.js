import { Schema, model, models } from "mongoose";

const userInfoSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const UserInfo = models.UserInfo || model("UserInfo", userInfoSchema);

export default UserInfo;
