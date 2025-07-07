import dotenv from 'dotenv'
dotenv.config();

import cors from 'cors';
import express from "express"
const app = express();

const port = process.env.PORT ||3000;
const hostname = process.env.HOSTNAME || 'localhost';

import mongoDB from './configs/mongodb.js';
import bookRoute from './routes/bookRoute.js'
import userRoute from './routes/userRoute.js'
import freeBookRoute from './routes/freeBookRoute.js'
import cookieParser from 'cookie-parser';

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: process.env.FRONTEND_URI,
    credentials: true
}));

mongoDB() //mongodb connection


app.get('/', (req, res) => {
    res.send('Now i have started the hi')
})
// defining Routes
app.use('/book', bookRoute);
app.use('/user', userRoute)
app.use('/free', freeBookRoute)
app.listen(port, () => {
    console.log(`server is running on http://${hostname}:${port}`)
})