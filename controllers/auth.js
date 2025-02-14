const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// import our UserModel
const UserModel = require('../models/user')

const saltRounds = 10;


// Expectations
// is the client is sending an object with a username and password key!
router.post('/sign-in', async function(req, res){
    try {

        // search for the user by the username from the request
        const user = await UserModel.findOne({username: req.body.username})

        // if there is no user
        if(!user){
            console.log('THERE WAS NO USER')
            return res.status(401).json({err: "Invalid credentials"})
        }

        // check the passwords
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.hashedPassword)
        // wrong password
        if(!isPasswordCorrect){
            console.log("PASSWORD INCORRECT")
            return res.status(401).json({err: 'Invalid Credentails'})
        }

        // create the token
        const token = jwt.sign({payload: user}, process.env.JWT_SECRET)

        res.status(200).json({token})


    } catch(err){
        console.log(err)
        res.status(500).json({err: err.message})
    }
})










// EXPECTATIONS -
// username and password key on the object being submitted
// to this route
router.post('/sign-up', async function(req, res){
    try {
        // guarentee the username is unique! if userInTheDatabase is undefined (that means there is no matching username)
        const userInTheDatabase = await UserModel.findOne({username: req.body.username})

        if(userInTheDatabase){
            return res.status(409).json({err: 'Username already taken'});
        }

        // create the hashPassword property on req.body from the req.body.password
        req.body.hashedPassword = bcrypt.hashSync(req.body.password, saltRounds)
        const user = await UserModel.create(req.body)

        const token = jwt.sign({payload: user}, process.env.JWT_SECRET)

        res.status(201).json({token})

    } catch(err){
        console.log(err)
        res.status(500).json({err: err.message})
    }
})


module.exports = router;