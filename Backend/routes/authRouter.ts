import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user'

const router = express.Router()

//new user registeration
router.post('/register', async(req, res)=>{
    const{username, password} = req.body
    try{
        //if user already exists
        const userExists = await User.findOne({username})
        if(userExists){
            return res.status(409).send('Username already exists')
        }
        else{
            //hash the password and then store user credentials in database
            const hashedPassword = await bcrypt.hash(password, 5)
            const newUser = await User.create({username, password:hashedPassword})
            return res.status(201).send('User registered')
        }
    }
    catch(err){
        return res.status(500).send('Registration failed')
    }
})

//existing user login functionality
router.post('/login', async(req, res)=>{
    const{username, password} = req.body
    try{
        //check if user's username matches with the one that is there in the database
        const user = await User.findOne({username})

        //if user does not exist in database send response invalid credentials
        if(!user){
            return res.status(401).send('Invalid Credentials')
        }
        else{
            //if user's username matches with the one that is there in the database, compare the passwords
            const matchPassword = await bcrypt.compare(password, user.password)
            //if passwords did not match send response invalid credentials
            if(!matchPassword){
                return res.status(401).send('Invalid credentials')
            }
            else{
                //if password matches too, generate a token which expires in 1 hour
                const token = jwt.sign({userId: user.id}, 'brainerhub', {expiresIn : '1h'})
                return res.status(200).send({token})
            }
        }
    }
    catch(err){
             return res.status(500).send('Login failed')   
    }
})

export default router