var userModel = require('../model/user');
// var userItem = require('../model/userItem');
var userProfile = require('../model/userProfile');
var itemDb = require('../utility/ItemDB')
const Promise = require('bluebird');

// module.exports.getUsers = function () {
    
//     let users = [];
//     console.log(userData.length + "jvghfghfjhg");
//     for (let i = 0; i < userData.length; i++) {
//         let user = new userModel(
//             userData[i].userId,
//             userData[i].firstName,
//             userData[i].lastName,
//             userData[i].emailId,
//             userData[i].address1,
//             userData[i].address2,
//             userData[i].city,
//             userData[i].zipCode,
//             userData[i].country
//         );
        
//         users.push(user);
        
//     } 
//     return users;

// };

// module.exports.getUser = function (userId) {
//     console.info("from DB, user Id :" + userId)
//     for (var i = 0; i < userData.length; i++) {
//             let user = new userModel(
//                 userData[i].userId,
//                 userData[i].firstName,
//                 userData[i].lastName,
//                 userData[i].emailId,
//                 userData[i].address1,
//                 userData[i].address2,
//                 userData[i].city,
//                 userData[i].zipCode,
//                 userData[i].country
//             )
//             console.log("Item"+JSON.stringify(item));
            
//             return user;
//         }
        
//     }

    exports.getUsers = (req, res, next) => {
        return new Promise((resolve, reject) => {
            userModel.find({}, function(err, data) {
                console.log("Mongo data");
                console.log(data);
                if(err){
                    return next(err)
                }
                resolve(data)
            })
    
        })
        
    }

    exports.getUser = (req, res, next) => {
        userModel.find({userId:req.userId}, function(err, data){
            console.log(data);
            if(err){
                return next(err)
            }
            return data;
        })
    }

    exports.getUserByEmail = (req, res, next) => {
        return new Promise((resolve, reject) => {
        userModel.findOne({emailId:req}, function(err, userdbData){
            console.log(userdbData);
            if(err){
                reject(err);
            }
            resolve(userdbData);
        });
    });
    }

    exports.postUser = (req, res, next) => {
        return new Promise((resolve, reject) => {
            var newUsertoReg = new userModel ({
                emailId: req.emailId,
                // password: req.psw,
                firstName: req.firstName,
                lastName: req.lastName,
                userId: req.userId,
                address1: req.address1,
                address2: req.address2,
                city: req.city,
                zipCode: req.zipCode,
                country: req.country
            });
            newUsertoReg.save(function(err) {
            if (err){
                reject(err);
            } 
            console.log('User created!');
            resolve({msg: "Successfully registered"});
            });
        })
    }


// var userData = [
//     {   
//         userId: "sbelote",
//         firstName: "Sagar",
//         lastName: "Belote",
//         emailId: "sagarbelote144@gmail.com",
//         address1: "ABC",
//         address2: "XYZ",
//         city: "Charlotte",
//         zipCode: 123,
//         country: "USA"
        
//     },
// ];
// var newUser = userModel(
//     {   
//         userId: "sbelote",
//         firstName: "Sagar",
//         lastName: "Belote",
//         emailId: "sagarbelote144@gmail.com",
//         address1: "ABC",
//         address2: "XYZ",
//         city: "Charlotte",
//         zipCode: 123,
//         country: "USA"
        
//     },
//     );
//     // save the user
// newUser.save(function(err) {
// if (err) throw err;

// console.log('User created!');
// });
