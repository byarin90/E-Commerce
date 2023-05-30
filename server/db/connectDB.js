import mongoose from "mongoose";
import { config } from "dotenv";
//! witout dotenv unvisible the MONGO_CONNECTION becouse its secret
config(); //?call to dotenv

//TODO: add a test to see if the connection is working
//! if working than Database is connected
export const connectToMongoDB = () => {
    //! connect to mongodb
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGO_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, () => console.log("MongoDb Connect..."))


}