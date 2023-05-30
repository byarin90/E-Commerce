import express from 'express'
import { connectToMongoDB } from './db/connectDB.js'
import { routesInit } from './routes/configRoutes.js'
//CRUD (Create, Read, Update, Delete)
import { config } from 'dotenv'
import { upload } from './utils/cloudinary.js'
import cors from 'cors'
config()
    //TODO: Connect to MongoDB
connectToMongoDB()

//TODO: Create Express App
const app = express()
app.use(cors())
    //TODO:Server Port
const port = process.env.PORT
    //TODO: app.use(express.json()) means to parse JSON data
app.use(express.json())

//TODO: Add Routes from routesInit
routesInit(app)


app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file.path);
    res.json({ msg: 'image uploaded', file: req.file });
});



//TODO: Start Server and Listen to Port
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})