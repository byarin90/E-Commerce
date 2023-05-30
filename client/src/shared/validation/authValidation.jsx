import joi from 'joi'
//Joi Validation for Client Side in React-Hook-Form
//TODO: use schema in reslovers in react-hook-form inside joiResolver(schema) for work


//? Regex for email
const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

//?Object with all schemas for validation auth
//TODO : ALL SCHEMAS FOR VALIDATION AUTH NEED TO BE WITH CUSTOM MESSAGES
export const authValidation = {
    //? registerSchema: schema for register 
    registerSchema: joi.object({
        name: joi.string().required().min(3).max(30).messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 3 characters long',
            'string.max': 'Name must be less than or equal to 30 characters long',
        }),
        imgProfile: joi.string().allow('',null),
        email: joi.string().regex(emailReg).required().messages({
            'string.empty': 'Email is required',
            'string.pattern.base': 'Email is invalid',
        }),
        password: joi.string().required().min(6).max(30).messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 6 characters long',
            'string.max': 'Password must be less than or equal to 30 characters long',
        }),
        confirmPassword: joi.string().required().valid(joi.ref('password')).messages({
            'string.empty': 'Confirm Password is required',
            'any.only': 'Confirm Password does not match',
        })
    }),
    //? loginSchema: schema for login
    loginSchema: joi.object({
        email: joi.string().regex(emailReg).required().messages({
            'string.empty': 'Email is required',
            'string.pattern.base': 'Email is invalid',
        }),
        password: joi.string().required().min(6).max(30).messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 6 characters long',
            'string.max': 'Password must be less than or equal to 30 characters long'
        })
    })
}