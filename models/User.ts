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

// ✅ Suggestions / Notes:
// 1. For social login, you can optionally store:
//    - provider: 'google' | 'github' | 'facebook'
//    - providerId: string (OAuth user id)
//    Example: { provider: 'google', providerId: '1234567890' }
//    This allows linking social accounts to this User model.
// 2. Passwords should be hashed when using credentials login.
//    Use bcrypt or argon2 to hash before saving.
// 3. `verificationToken` can be used for email verification flow.
// 4. You already handle unique constraints for id, email, and phone — good practice.
// 5. `createdAt` uses a default function to always store creation time.

// Exporting model safely without overwriting existing models in dev
export default mongoose.models.User || mongoose.model("User", UserSchema);
