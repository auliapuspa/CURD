import mongoose from "mongoose";

const connectDB = () => {
  mongoose.connect(process.env.MONGO_URL)
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((error) => {
      console.error("Database connection error:", error.message);
      process.exit(1);
    });
};

export default connectDB;