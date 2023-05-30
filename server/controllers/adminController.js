import { UserModel } from "../models/userModel.js"


const adminUserCtrl = {
    getAllUsers: async(req, res) => {
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
    }
}



export { adminUserCtrl }