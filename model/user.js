

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    }, 
    emailId: {
        type: String
    },
    address1: {
        type: String
    },
    address2: {
        type: String
    }, 
    city: {
        type: String
    },
    zipCode: {
        type: String
    },
    country: {
        type: String
    }

},{
    timestamps: true,
})

const user = mongoose.model('user', userSchema)
module.exports = user;