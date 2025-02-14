const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')

// import our UserModel
const UserModel = require('../models/user')

const saltRounds = 10;

// EXPECTATIONS -
// username and password key on the object being submitted
// to this route
router.post('/sign-up', async function(req, res){
    try {
        const userInTheDatabase = await UserModel.findOne({username: req.body.username})

        if(userInTheDatabase){
            return res.status(409).json({err: 'Username already taken'});
        }

        // create the hashPassword property on req.body from the req.body.password
        req.body.hashedPassword = bcrypt.hashSync(req.body.password, saltRounds)
        const user = await UserModel.create(req.body)

        res.status(201).json({user})

    } catch(err){
        console.log(err)
        res.status(500).json({err: err.message})
    }
})


module.exports = router;