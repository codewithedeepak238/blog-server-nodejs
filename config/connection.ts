import mongoose from "mongoose";
import dontenv from "dotenv";

dontenv.config();

if(!process.env.MONGODB_URI){
    throw new Error("Please provide database URI.");
}

export default async function connectToMongoDB() {
    try{
        await mongoose.connect(process.env.MONGODB_URI || "");
        console.log("MongoDB Connected!!")
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}