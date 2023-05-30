import { Router } from 'express'
import { createToken, UserModel, validateUser, validateUserLogin } from '../models/userModel.js'
import { hash, compare } from 'bcrypt'
import { authAdmin, authUser } from '../middleware/authentication.js'

const router = Router()
router.get('/myInfo', authUser, async(req, res) => {
        try {
            const user = await UserModel.findById(req.tokenData._id, { password: 0, __v: 0 })
            return res.status(200).json(user)
        } catch (err) {
            console.log(err)
            return res.status(500).json({ err_msg: err })
        }
    })
    // ?Check Token
router.get('/checkToken', authUser, async(req, res) => {
    const payload = req.tokenData
    return res.json({ msg: 'Token is valid', payload })
})

//?Router for Login
router.post('/login', async(req, res) => {
    try {
        //!Validate the bodyData from the request with Joi ("email","password")
        const validation = validateUserLogin(req.body)
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
        return res.status(200).json({ token })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ err_msg: err })
    }
})

//?Router create a new user (Sign up)
router.post('/', async(req, res) => {
    try {
        //!Validate the bodyData from the request with Joi
        const validation = validateUser(req.body)
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
})

//? Router get all users
router.get('/', authAdmin, async(req, res) => {
    try {
        //! Command from mongoose to get all users => db.collection.find({})
        const users = await UserModel.find({})
            //! if not find users in db and length is 0
        if (!users.length) {
            return res.status(404).json({ err_msg: 'No users found' })
        }

        //?return all users
        return res.status(200).json(users)

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err_msg: err })
    }
})
export default router