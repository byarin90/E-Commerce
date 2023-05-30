import { UserModel } from "../models/userModel.js";

const userCtrl = {
    myProfile: async(req, res) => {
        try {
            const user = await UserModel.findById(req.tokenData._id, { password: 0, __v: 0 })
            return res.status(200).json(user)
        } catch (err) {
            console.log(err)
            return res.status(500).json({ err_msg: err })
        }
    }
};


export default userCtrl;