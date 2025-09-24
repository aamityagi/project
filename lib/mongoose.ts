import mongoose from "mongoose";

// ✅ MongoDB connection URI from environment
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local"
  );
}

// ✅ Use global cached connection to avoid multiple connections in development
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectMongo() {
  // ✅ Return cached connection if exists
  if (cached.conn) return cached.conn;

  // ✅ Create a new connection promise if not exists
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!).then((m) => m);
  }

  // ✅ Await connection promise and cache it
  cached.conn = await cached.promise;
  return cached.conn;
}

// 💡 Suggestion:
// 1. Always use connectMongo() in your NextAuth adapter or any API route before accessing DB.
// 2. This caching avoids "Too many connections" error in Next.js dev mode.
// 3. You can optionally log a message when connected:
//    console.log("MongoDB connected successfully");
