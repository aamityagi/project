// src/models/User.ts
import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
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
  createdAt: { type: Date, default: () => new Date() },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
