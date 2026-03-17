import mongoose from "mongoose";

export async function connecMD() {
  try {
    await mongoose.connect(process.env.mongoUrl);
  } catch (error) {
    console.log("Failed to connect mongodb", error);

    process.exit(1);
  }
}
