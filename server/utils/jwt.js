import secret from "../config/secret.js";
import Jwt from "jsonwebtoken";

// create a function to create token
export const createToken = ({ _id, role }) => {
    //!create a token with the _id and role in the payload,Secret key to create a token

    const token = Jwt.sign({ _id, role }, secret.JWT_SECRET, { expiresIn: '1m' })
    return token;
}