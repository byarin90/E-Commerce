import Joi from "joi";

const userValid = {
    validateUser: (bodyData) => {
        //create a schema to validate for bodyData 
        const validation = Joi.object({
                name: Joi.string().min(2).max(50).required(),
                email: Joi.string().min(5).max(50).required().email(),
                password: Joi.string().min(5).max(22).required(),
                imgProfile: Joi.string().allow(null)
            })
            //return the validation result => { error, value,warning }
        return validation.validate(bodyData);
    },
    validateUserLogin: (bodyData) => {
        //create a schema to validate for bodyData 
        const validation = Joi.object({
                email: Joi.string().min(5).max(50).required().email(),
                password: Joi.string().min(5).max(22).required()
            })
            //return the validation result => { error, value,warning }
        return validation.validate(bodyData);
    }
}

export default userValid;