import express from 'express'
import testrouter from './routes/testrouter.js';
import auth from './routes/auth.js'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import morgan from 'morgan'
import run from './config/db.js';
//import inventory from '../routes/inventoryroutes.js'
dotenv.config()

run();
const app=express()
//middlewares
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use('/test',testrouter)
app.use('/api/v1/auth', auth);


const port =  8000
app.listen(port,()=>{
    console.log(`Node server running in ${process.env.DEV_MODE} on port${8000}`.bgBlue.white);
})