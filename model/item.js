
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    itemCode: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    catalogCategory: {
        type: String
    }, 
    author: {
        type: String
    },
    note: {
        type: String
    },
    description: {
        type: String
    }, 
    rating: {
        type: String
    },
    imgUrl: {
        type: String
    },
    emailId: {
        type: String
    }
},{
    timestamps: true,
})

const Item = mongoose.model('item', itemSchema)
module.exports = Item;

