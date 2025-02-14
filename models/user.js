const mongoose = require('mongoose')

// This is a demo user you can add whatever properties you want!

// Starter code will be configured to sign up/sign in
// with a username property
const userSchema = mongoose.Schema({
    username: String,
    hashedPassword: String
})

// event listener for anytime a user document
// is in encoded in JSON, it will run this function
// which deletes the hashedpassword from the user
// document
userSchema.set('toJSON', {
    transform: (doc, returnedObject) => {
        delete returnedObject.hashedPassword
        return returnedObject
    }
})



const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel;