import mongoose from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please add MONGODB_URI to .env.local");
}
declare global {
  var mongoose: {
    conn: typeof import("mongoose") | null;
    promise: Promise<typeof import("mongoose")> | null;
  };
}

let cached = global.mongoose as {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  cached.promise = mongoose.connect(MONGODB_URI);
  cached.conn = await cached.promise;
  return cached.conn;
}