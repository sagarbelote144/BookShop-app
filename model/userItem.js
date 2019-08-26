
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userItemSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
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
    rating: {
        type: String,
        required: true

    },
    baughtIt: {
        type: String,
        required: true
    },

},{
    timestamps: true,
})



const userItem = mongoose.model('userItem', userItemSchema);

// exports.getdbUserItems = (req, res, next) => {
//     return new Promise((resolve, reject) => {
//         userItem.find({}, function(err, data) {
//             console.log("Mongo data");
//             console.log(data);
//             if(err){
//                 return next(err)
//             }
//             resolve(data)
//         })

//     }) 
// }
module.exports = userItem;

