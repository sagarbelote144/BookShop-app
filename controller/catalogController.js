var express = require('express');
var app = module.exports = express();
var router = express.Router();
var breadcrumbs = require('express-breadcrumb');
var appUtil = require('../utility/appUtil');
var itemDb = require('../utility/ItemDB');
var userDb = require('../utility/userDB');
var userModel = require('../model/user');
var itemModel = require('../model/item');
var session= require('express-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var cookieParser = require ('cookie-parser');
const { check, validationResult } = require('express-validator/check');
app.use (cookieParser());
app.use (session ({secret : "Expectopatrona"}));

// exports.getItems = (req, res, next) => {
//     itemModel.find({}, function(err, data) {
//         console.log(data);
//         if(err){
//             return next(err)
//         }
//         return data;
//     })
// }
// exports.getItem = (req, res, next) => {
//     itemModel.find({firstName:req.query.firstName}, function(err, data){
//         console.log(data);
//         if(err){
//             return next(err)
//         }
//         return data
//     })
// }

/* GET home page. */
router.get('/', breadcrumbs.Middleware(), function(req, res, next) {
    console.log("inside /");
    var page= {
        title:'Home',
        path: req.url
    }
    req.breadcrumbs = appUtil.cleanUrl(req.breadcrumbs);
  res.render('index', { title: page, breadcrumbs: req.breadcrumbs });

});

router.get('/Categories/:categoryName', breadcrumbs.Middleware(), function (req,res) {
    // get the category name
    
    console.log("categories ke oehle");
    var categories = [];
    categories.push(req.params.categoryName);
    var itemData = itemDb.getItems();
    var data= {
        title:'Categories',
        path: req.url,
        categories: categories,
        items: itemData
    }
    req.breadcrumbs = appUtil.cleanUrl(req.breadcrumbs);
    res.render('Categories', { data: data, breadcrumbs: req.breadcrumbs });
})

router.get('/Categories',breadcrumbs.Middleware(), function(req, res, next) {
    console.log("categories 1");
    var categories = getCategories();
    console.log(categories);
    // itemDb.getItems().exec(function(err, result){   
    // })
    var itemData = itemDb.getItems();
    itemData.then((data) => {
        console.log("ek number");
        // var responseMessage = JSON.parse(data)
        console.log("tera data");
        console.log(itemData);

        var dbData= {
            title:'Categories',
            path: req.url,
            categories: categories,
            items: data
        }
        // console.log(itemData);
        console.log("req.breadcrumbs:"+JSON.stringify(req.breadcrumbs))
        req.breadcrumbs = appUtil.cleanUrl(req.breadcrumbs);
        console.log("req.breadcrumbs:"+JSON.stringify(req.breadcrumbs))
        // console.log(itemData);
        // console.log(data);
        res.render('Categories', { data: dbData , breadcrumbs: req.breadcrumbs});
    })
    .catch(err => {
        console.log("Categories route error: " + err)
    })
});
// .then( data => {
// .then(data1 => {
//     console.log(data1);
// })

router.get('/contact', breadcrumbs.Middleware(), function(req, res, next) {
    var page= {
        title:'Contact Us',
        path: req.url
    }
    req.breadcrumbs = appUtil.cleanUrl(req.breadcrumbs);
    res.render('contact', {title:page, breadcrumbs: req.breadcrumbs});
});

router.get('/about',breadcrumbs.Middleware(), function(req, res, next) {
    var page= {
        title:'About Us',
        path: req.url
    }
    req.breadcrumbs = appUtil.cleanUrl(req.breadcrumbs);
    res.render('about', {title:page, breadcrumbs: req.breadcrumbs});
});

router.get('/categories/item/:itemCode', breadcrumbs.Middleware(), 
[
    check('itemCode')
    .isInt()
    .withMessage('Must pass only numbers characters')
    .isIn(['1', '2', '3','4','5','6','7','8','9','10'])
    .withMessage('Invalid Item code')
],
function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
    var itemCode = req.params.itemCode;
    console.log("Item Code:"+itemCode);
    var item = itemDb.getItem(itemCode);
    item.then((data) => {
        if(data.length>0){
            console.log(data);
            var dbData= {
                title:'Item',
                path: req.url,
                item: data
            }
            req.breadcrumbs = appUtil.cleanUrl(req.breadcrumbs);
            res.render('item', { data: dbData, breadcrumbs: req.breadcrumbs});         
        }else{
            res.render('index');          
        }   
    }).catch(err => {
        console.log("Categories route error: " + err);
        res.render('index');
    })  
});
//x
// router.get('/mybooks', breadcrumbs.Middleware(), function(req, res, next) {
    
//     var userObj = require('./../model/user');
//     var users = userDb.getUsers();
//     console.log("124546674574");
//     console.log(users);
    //x


    // userObj.userId(userDb.userData.userId);
    // userObj.firstName(userDb.userData.firstName);
    // userObj.lastName(userData.lastName);
    // userObj.emailId(userData.emailId);
    // userObj.address1(userData.address1);
    // userObj.address2(userData.address2);
    // userObj.city(userData.city);
    // userObj.state(userData.state);
    // userObj.zipCode(userData.zipCode);
    // userObj.country(userData.country);

    // var userObject = userObj.theUser();
    // let theUserInfo = [];
    //x
    // req.session.userId = users._userId;
    // req.session.firstName = users._firstName;
    // req.session.lastName = users._lastName;

    // var theUserInfo = {
    //     userId: req.session.userId,
    //     firstName: req.session.firstName,
    //     lastName: req.session.lastName
    // }
    // req.session.theUserInfo = theUserInfo;

//     var page= {
//         title:'My Books',
//         path: req.url
//     }
//     req.breadcrumbs = appUtil.cleanUrl(req.breadcrumbs);
//     res.render('mybooks', {title:'My Books', breadcrumbs: req.breadcrumbs});
// });
//x
var categories = [];
let getCategories = function() {
    var data = itemDb.getItems().then( data => {
    // console.log(data);
    data.forEach(function (item) {
        if(!categories.includes(item.catalogCategory)){
            categories.push(item.catalogCategory);
        }
        
    });
    console.log("categories here");
    console.log(categories);
    })
    return categories;  
};

module.exports = router;
