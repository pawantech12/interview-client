import mongoose from "mongoose";
const MongoURI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MongoURI);
    console.log("Connection successfull to database");
  } catch (error) {
    console.error("Database connection unsuccessfull", error);
  }
};

export default connectDB;
