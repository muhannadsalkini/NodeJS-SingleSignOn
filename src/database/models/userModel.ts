import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
  code: {
    token: string;
    takenAt: Date;
    expireAt: Date;
  };
}

const userSchema: Schema<IUser> = new Schema(
  {
    id: {
      type: String,
      unique: true,
      index: true,
    },
    name: { type: String, required: true },
    surname: String,
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    phone: String,
    password: String,
    code: {
      token: String,
      takenAt: Date,
      expireAt: Date,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
export default User;
