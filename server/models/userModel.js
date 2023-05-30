import mongoose from "mongoose";

//create a model to DataBase for user
//any property can be added to the schema with type
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: "user"
    },
    imgProfile: {
        type: String,
        default: "https://www.vhv.rs/dpng/d/409-4090121_transparent-background-user-icon-hd-png-download.png"
    },
    dateCreated: {
        //default property of dateCreated
        type: Date,
        default: (Date.now() + 2 * 60 * 60 * 1000)
    }
})

//create a model to DataBase for user with the schema and collection
//export const ColModel = mongoose.model('Col', ColSchema);
export const UserModel = mongoose.model('users', userSchema);