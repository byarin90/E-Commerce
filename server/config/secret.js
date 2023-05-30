import { config } from 'dotenv'
config()
const secret = {
    MONGO_CONNECTION: process.env.MONGO_CONNECTION,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME
}

export default secret;