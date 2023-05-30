import Jwt from "jsonwebtoken";
import secret from "../config/secret.js";


export const authUser = (req, res, next) => {
    try {
        //? Get token from header ('Authorization')
        const token = req.header('Authorization');
        //! Check if token isExsist
        if (!token) {
            return res.status(401).json({ err_msg: "you don't have a token for this end-point" })
        }

        //? Decode token and verify it
        //TODO: Verify token - check if token is valid and not expired
        //Get Payload from token
        const decodeingToken = Jwt.verify(token, secret.JWT_SECRET);
        //?Send the payload to router in the memory from req!!
        req.tokenData = decodeingToken;
        //?Next to router from the middleware
        next();
    } catch (err) {
        //! if catch error , return error (invalid token or expired token) with message
        return res.json({ err, msg: "invalid decodeing" })

    }
}
export const authAdmin = (req, res, next) => {
    try {
        //? Get token from header ('Authorization')
        const token = req.header('Authorization');
        //! Check if token isExsist
        if (!token) {
            return res.status(401).json({ err_msg: "you don't have a token for this end-point" })
        }
        //? Decode token and verify it
        //TODO: Verify token - ccheck if token is valid and not expired
        //Get Payload from token
        const decodeingToken = Jwt.verify(token, secret.JWT_SECRET);
        if (decodeingToken.role === "admin") {
            //?Send the payload to router in the memory from req!!
            req.tokenData = decodeingToken;
            //?Next to router from the middleware
            next();
        } else {
            return res.status(401).json({ err_msg: "you don't have access to this end-point you must be an admin" })
        }

    } catch (err) {
        //! if catch error , return error (invalid token or expired token) with message
        return res.json({ err, msg: "invalid decodeing" })

    }
}