import mongoose from "mongoose";

// ✅ Get MongoDB URI from env
const MONGODB_URI = process.env.MONGODB_URI;

// ❌ Throw error if missing
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

// ✅ Type assertion for TS
const MONGODB_URI_STR: string = MONGODB_URI;

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached = global.mongooseCache ?? { conn: null, promise: null };
global.mongooseCache = cached;

export async function connectMongo(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI_STR).then((mongooseInstance: typeof mongoose) => {
      if (process.env.NODE_ENV !== "production") {
        console.log("✅ MongoDB connected successfully");
      }
      return mongooseInstance;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
