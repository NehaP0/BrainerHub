import express from 'express'
import mongoose from 'mongoose'
import authRouter from './routes/authRouter'
import connection from './db'


const app = express()
app.use(express.json());


//Routes
app.use('/auth', authRouter)



//Starting the server
const port = process.env.PORT
app.listen(port, async()=>{
    try {
        await connection;
        console.log("DB Connected");
      } catch (error) {
        console.log("error connecting to db");
      }
    console.log(`Server running at port ${port}`);
    
})