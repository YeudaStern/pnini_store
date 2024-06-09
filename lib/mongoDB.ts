import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async (): Promise<void> => {
    mongoose.set("strictQuery", true);

    if(isConnected) {
        console.log("MongoBD is connecting");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL || "", {
            dbName: "Pnini_store"
        })

        isConnected = true
        console.log('MongoDB is connected');
        
    } catch (error) {
        console.log("Failed to connect to MongoDB");
        
    }
 }