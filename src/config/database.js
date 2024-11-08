import mongoose from "mongoose";
import { config } from "./config.js";

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(config.mongoUri);
        console.log("Connected to database");
    } catch (error) {
        console.error("Error connecting to database: ", error);
        throw error;
    }
};

export const disconnectFromDatabase = async () => {
    try {
    await mongoose.disconnect();
    console.log("Disconnected from database");
    } catch (error) {
        console.log("Error disconnecting from database: ", error);
    }
}