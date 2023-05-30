import mongoose from "mongoose";
import Joi from "joi";
import Jwt from "jsonwebtoken";
import { config } from "dotenv";
// 
config()
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

// create a function to create token
export const createToken = ({ _id, role }) => {
    //!create a token with the _id and role in the payload,Secret key to create a token

    const token = Jwt.sign({ _id, role }, process.env.JWT_SECRET, { expiresIn: '20m' })
    return token;
}


//Joi validation 
export const validateUser = (bodyData) => {
    //create a schema to validate for bodyData 
    const validation = Joi.object({
            name: Joi.string().min(2).max(50).required(),
            email: Joi.string().min(5).max(50).required().email(),
            password: Joi.string().min(5).max(22).required(),
            imgProfile: Joi.string().allow(null)
        })
        //return the validation result => { error, value,warning }
    return validation.validate(bodyData);
}
export const validateUserLogin = (bodyData) => {
    //create a schema to validate for bodyData 
    const validation = Joi.object({
            email: Joi.string().min(5).max(50).required().email(),
            password: Joi.string().min(5).max(22).required()
        })
        //return the validation result => { error, value,warning }
    return validation.validate(bodyData);
}