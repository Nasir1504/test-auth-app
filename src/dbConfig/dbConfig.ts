import mongoose from "mongoose";

const connection: { isConnected?: number } = {}

export async function connect() {
    if (connection.isConnected) {
        console.log("Using existing MongoDB connection")
        return //already connected
    }
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error("MONGODB_URI is not set. Please add it to your environment (e.g., .env.local)");

    }
    try {
        const db = await mongoose.connect(uri)
        
        connection.isConnected = db.connections[0].readyState;

        const conn = mongoose.connection;

        conn.on("connected", () => {
            console.log("MongoDB connected");
        })
        conn.on("error", (e) => {
            console.log("MongoDB connected error", e);
            process.exit();
        })
        console.log("MongoDB Connected Successfully");
        
    } catch (e) {
        console.log("Something went wrong while connecting to DB");
        console.log(e)
    }
}