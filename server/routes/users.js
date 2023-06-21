import { Router } from 'express'
import { authUser } from '../middleware/authentication.js'
import authCtrl from '../controllers/authController.js'
import userCtrl from '../controllers/userController.js'
import { adminUserCtrl } from '../controllers/adminController.js'

const router = Router()
    // !Auth Routes
    //?Router for Login
router.post('/login', authCtrl.login)
    //?Router create a new user (Sign up)
router.post('/', authCtrl.register)
    // ?Check Token
router.get('/protected', authUser, authCtrl.checkToken)
router.post('/logout', authCtrl.logout)

// !User Routes
router.get('/myInfo', authUser, userCtrl.myProfile)


// !Admin users Routes
//? Router get all users
// router.get('/', authAdmin, adminUserCtrl.getAllUsers)



export default router