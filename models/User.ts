// models/User.ts
"use server";

import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  id: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role?: string;
  extraInfo?: string;
  terms?: boolean;
  profession: string;
  professionLink?: string;
  isVerified?: boolean;
  verificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt?: Date;
}

const UserSchema = new Schema<IUser>({
  id: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  extraInfo: { type: String, default: "" },
  terms: { type: Boolean, default: false },
  profession: { type: String, required: true },
  professionLink: { type: String, default: "" },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String, default: "" },
  resetPasswordToken: { type: String, default: "" },
  resetPasswordExpires: { type: Date },
  createdAt: { type: Date, default: () => new Date() },
});

// ✅ Safer null-check
const User = (models?.User as mongoose.Model<IUser>) || model<IUser>("User", UserSchema);

export default User;
