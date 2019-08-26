

var userDb = require('../utility/userDB');
let userItemsList=[];
let UserItem=require('../model/userItem');
var user = require('../model/user');
var itemDb = require('../utility/ItemDB.js');
var Item = require('../model/item');
// const rp = require('request-promise');
const Promise = require('bluebird');

var UserItem1 = new userProfile("sbelote", itemDb.getItem(1) , '5', 'No');
var UserItem2 = new userProfile("sbelote", itemDb.getItem(4), '2', 'No');


var userItemList = [UserItem1, UserItem2];

// var UserProfile1 = new userProfile("sbelote", userItemList);

function userProfile(UserID, UserItems){
    this.UserID = UserID;
    this.UserItems = UserItems;
  }


 getUserItems = function getUserItems(UserID){
    if (UserID === "sbelote"){
      return UserProfile1.UserItems;
    } else {
      console.log("No match found");
    }
  }


module.exports.getUserProfile = function(UserID){
    if (UserID === "sbelote"){
      // exports.getUserItem = (req, res, next) => {
        return new Promise((resolve, reject) => {
          UserItem.find({}, function(err, data){
            console.log(data);
            if(err){
                return next(err)
            }
            resolve(data)
        })
    
        })
      }
      else {
        console.log("No match found");
      }
      
    };


module.exports.adduserItem = function(useritem, item)
{
  console.log("session ka useritem");
  console.log(useritem);
  console.log(item);
  console.log(item[0].itemCode);

  return new Promise(function(resolve, reject) {
    UserItem.find({}, function(err, data){
      console.log("mongo se read kiya");
      console.log(data);
      if(err){
        reject(err);
      }
      let c = 0;
      for (let i=0; i < data.length; i++){
        if (data[i].itemCode == item[0].itemCode){
          c++;
        }
      }
      if (c === 0){
        var UserItem3 = new UserItem({
          userId: "sbelote",
          itemCode: item[0].itemCode,
          itemName: item[0].itemName,
          catalogCategory: item[0].catalogCategory,
          rating: '1',
          baughtIt: "No"
        });
        UserItem3.save(function(err) {
          if(err) {
            // return next(err)
            reject(err);
          }
          UserItem.find({}, function(err, data){
            if (err) {
              // return next(err)
              reject(err);
            } 
            
            var useritem = data;
            console.log("userprofile after adding");
            console.log(useritem);
            resolve(useritem);
          });
        });
      }
      else{
        console.log("Item already exists");
        // reject("Item already exists"); 
        resolve(useritem);         
      }
    });
  });
};
    
module.exports.updateItem = function(useritem, itemcode, rating){
    let set={
      'rating': rating,
      'baughtIt': "Yes"
    }
    let filter = {
      'itemCode': itemcode
    }
    return new Promise(function(resolve, reject){
          UserItem.findOneAndUpdate(filter, set, (err, data) => {
          if (err) {
            res.statusCode = 400;
            reject(err);
          }
          console.log("item rating successfully updated")
          UserItem.find({}, function(err, data){
            console.log(data);
            if(err){
              reject(err);
            }
            resolve(data)
          })
        });        
  })
};

module.exports.updateItemStatus = function(useritem, itemcode, baughtIt){

  let set={
    'baughtIt': baughtIt
  }
  let filter = {
    'itemCode': itemcode
  }
  return new Promise(function(resolve, reject){
      UserItem.findOneAndUpdate(filter, set, (err, data) => {
        if (err) {
          res.statusCode = 400
          reject(err);
        }
        console.log("item status successfully updated")
        UserItem.find({}, function(err, data){
          if(err){
            reject(err);
          }
          resolve(data)
        })
      });        
})
};

module.exports.removeItem = function(useritem, itemcode){

    return new Promise(function(resolve, reject){
      UserItem.findOneAndRemove({itemCode: itemcode}, function(err, uitem){
          if(err){
              reject(err);
          }
            console.log("item successfully deleted");
            UserItem.find({}, function(err, data){
              if(err){
                reject(err);
              }
              resolve(data)
            })
          })
    })
}
// var newUserItem = UserItem(
//   {   
//       userId: "sbelote",
//       itemCode: "4",
//       itemName: "The Descent of Monsters",
//       catalogCategory: "Novels",
//       rating: "2",
//       baughtIt: "No"        
//   }
//   );
//   // save the user
// newUserItem.save(function(err) {
// if (err) throw err;
// console.log('UserItem created!');
// });



