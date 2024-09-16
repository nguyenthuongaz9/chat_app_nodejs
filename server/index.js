import dotenv from 'dotenv';
import express from "express"
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from "mongoose"
import authRouter from "./routes/auth.route.js"
import connectDB from "./db/db.js"


dotenv.config()

const app = express()
const port = process.env.PORT || 3001


app.use(cors({
    origin: (origin, callback) => {
        callback(null, true);  
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
}))

app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRouter)



const server = app.listen(port, ()=> {
    connectDB()
    console.log(`Server is running on port ${port}`)
})







