import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  if (process.env.NODE_ENV === "development") {
    console.warn("⚠️ MONGODB_URI not defined, skipping MongoDB connection in dev.");
  } else {
    throw new Error("Please define the MONGODB_URI environment variable in .env.local");
  }
}

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
  if (!MONGODB_URI) return mongoose;

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then(m => {
      if (process.env.NODE_ENV !== "production") {
        console.log("✅ MongoDB connected successfully");
      }
      return m;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
