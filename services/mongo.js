import mongoose from "mongoose";

export async function dbConnect() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    return conn;
  } catch (err) {
    console.log(err);
  }
}
