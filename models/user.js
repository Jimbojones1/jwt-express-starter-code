const mongoose = require('mongoose')

// This is a demo user you can add whatever properties you want!

// Starter code will be configured to sign up/sign in
// with a username property
const userSchema = mongoose.Schema({
    username: String,
    hashedPassword: String
})


const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel;