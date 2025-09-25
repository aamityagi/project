import mongoose from "mongoose";
import { connectMongo } from "./mongoose";

/**
 * Check if MongoDB is connected
 */
export async function isConnected(): Promise<boolean> {
  try {
    await connectMongo();
    return mongoose.connection.readyState === 1;
  } catch {
    // ❌ removed unused 'err', just return false
    return false;
  }
}

/**
 * Return human-readable connection state
 */
export function readyStateName(): string {
  const names: Record<number, string> = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };
  return names[mongoose.connection.readyState] || String(mongoose.connection.readyState);
}
