import mongoose from "mongoose";

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    console.error("❌ MONGODB_URI is not defined in .env file");
    process.exit(1);
  }

  try {
    const connectionInstance = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      w: "majority",
    });

    console.log("✅ MongoDB Connected Successfully");
    console.log(`DB HOST: ${connectionInstance.connection.host}`);
    return connectionInstance;
  } catch (err) {
    console.error("❌ Error in DataBase Connection -->", err.message);
    console.error("Please verify:");
    console.error("1. MongoDB Atlas cluster is running");
    console.error("2. IP address is whitelisted (0.0.0.0/0 for development)");
    console.error("3. Username and password are correct");
    console.error("4. Database name exists in the connection string");
    process.exit(1);
  }
};

export default connectDB;
