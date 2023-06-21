import { compare, hash } from "bcrypt";
import { UserModel } from "../models/userModel.js";
import userValid from "../validations/userValidations.js";
import { createToken } from "../utils/jwt.js";
import { RefreshTokenModel } from "../models/refreshTokenModel.js";
import secret from "../config/secret.js";
import { clearCookies } from "../middleware/authentication.js";

const authCtrl = {
    register: async(req, res) => {
        try {
            //!Validate the bodyData from the request with Joi
            const validation = userValid.validateUser(req.body)
                //! if validation is not ok
            if (validation.error) {
                //!return validation error message
                return res.status(400).json({ err_msg: validation.error.details[0].message })
            }

            //Todo: Create a new user
            const user = new UserModel(req.body)


            console.log(req.file)
                //? Hash the password
            user.password = await hash(req.body.password, 10)

            //? Save the user in the database
            await user.save()

            user.password = "*********"
                //? return the created user (Status 201)
            return res.status(201).json(user)
        } catch (err) {
            //!return error message if user already exists (email already exists)!!
            if (err.code == 11000) {
                //! code == 11000 means already exists
                return res.status(403).json({ err_msg: 'User already exists' })
            }
            console.log(err)
            return res.status(500).json({ err_msg: err })
        }
    },
    login: async(req, res) => {
        try {
            //!Validate the bodyData from the request with Joi ("email","password")
            const validation = userValid.validateUserLogin(req.body)
                // if validation is not ok
            if (validation.error) {
                //!return validation error message
                return res.status(400).json({ err_msg: validation.error.details[0].message })
            }
            //TODO:Find the user in the database by email
            const user = await UserModel.findOne({ email: req.body.email })
                //! if user is not found
            if (!user) {
                return res.status(403).json({ err_msg: 'Email or password invalid' })
            }
            //? Check if the password is correct
            const passwordIsValid = await compare(req.body.password, user.password)
            if (!passwordIsValid) {
                return res.status(403).json({ err_msg: 'Email or password invalid' })
            }

            //?User is found and password is correct
            // TODO: Create a accessToken and refreshToken
            const accessToken = createToken(user, secret.ACCESS_TOKEN_TTL)
            const refreshToken = createToken(user, secret.REFRESH_TOKEN_TTL)
                //Todo: Save the refreshToken in the database

            await RefreshTokenModel.deleteMany({ user: user._id })
            const newRefreshToken = new RefreshTokenModel({ token: refreshToken, user: user._id })
            await newRefreshToken.save()

            //? Send the accessToken and refreshToken to cookies
            res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: "lax" });
            res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: "lax" });

            res.status(200).json({ message: "Logged in", login: true });
        } catch (err) {
            console.log(err)
            return res.status(500).json({ err_msg: err, login: false })
        }
    },
    logout: async(req, res) => {
        try {
            clearCookies(res);
            return res.status(200).json({ message: "Logged out", login: false });
        } catch (err) {
            console.log(err)
            return res.status(500).json({ err_msg: err })
        }
    },
    checkToken: async(req, res) => {
        const payload = req.tokenData
        return res.json({ msg: 'Token is valid', payload })
    }
};


export default authCtrl;