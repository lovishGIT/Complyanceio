import mongoose from "mongoose";

const connectDB = async (db: string) => {
    try {
        const Connection = await mongoose.connect(db);
        console.log(`MongoDB Connected: ${Connection.connection.host}`);
    } catch (error: any) {
        console.error("Error: ", error.message);
        process.exit(1);
    }
};

export default connectDB;