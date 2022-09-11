import mongoose from "mongoose";
const { model, Schema } = mongoose;

import { env } from "../env";
import { User } from "../models/user.model";

const UserSchema = new Schema<User>(
  {
    firstName: { type: String, required: false, default:'' },
    lastName: { type:String, required: false, default:'' },
    phoneNumber: { type:Number, required: true},
    email: {type:String, required:false, default:''},
  },
  {
    collection: env.USER_MANAGEMENT,
  }
);

const UserDB = model<User>(
  "user",
  UserSchema
);

export { UserDB };
