// src/models/Keyword.ts
import mongoose from "mongoose";

const KeywordSchema = new mongoose.Schema({
  keyword: { type: String, required: true },
  country: { type: String, required: true },
  Intent: { type: String, default: "" },
  Volume: { type: Number, default: 0 },
  KD: { type: Number, default: 0 },
  CPC: { type: Number, default: 0 },
  SF: { type: Number, default: 0 },
  UpdateDate: { type: Date, default: Date.now },
});

export default mongoose.models.Keyword || mongoose.model("Keyword", KeywordSchema);
