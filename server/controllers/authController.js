import { compare, hash } from "bcrypt";
import { UserModel } from "../models/userModel.js";
import userValid from "../validations/userValidations.js";
import { createToken } from "../utils/jwt.js";

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
            // TODO: Create a token
            const token = createToken(user)
                //? Send the token in a cookie
            res.cookie('token', token, { httpOnly: true, sameSite: "lax" });
            res.status(200).json({ message: "Logged in", login: true });
        } catch (err) {
            console.log(err)
            return res.status(500).json({ err_msg: err, login: false })
        }
    },
    logout: async(req, res) => {
        try {
            res.clearCookie('token').status(200).json({ message: "Logged out" });
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