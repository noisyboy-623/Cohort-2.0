import mongoose from "mongoose";

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.name}`);
};

export default connectDB;