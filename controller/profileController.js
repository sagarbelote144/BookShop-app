var express = require('express');
var app = module.exports = express();
var router = express.Router();
var breadcrumbs = require('express-breadcrumb');
var appUtil = require('../utility/appUtil');
var itemDb = require('../utility/ItemDB');
var userDb = require('../utility/userDB');
var userModel = require('../model/user')
var session= require('express-session');
var bodyParser = require('body-parser');
var userProfile = require('../model/userProfile');
const {check, oneOf, validationResult } = require('express-validator/check');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var cookieParser = require ('cookie-parser');
app.use (cookieParser());
app.use (session ({secret : "Expectopatrona"}));


/* GET home page. */
router.get('/', breadcrumbs.Middleware(), function(req, res, next) {
    var page= {
        title:'Home',
        path: req.url
    }
    req.breadcrumbs = appUtil.cleanUrl(req.breadcrumbs);
  res.render('index', { title: page, breadcrumbs: req.breadcrumbs });

});



/* GET My books page and handling actionflags. */
router.get('/mybooks',
[
    check('actionFlag')
    .isAlpha()
    .withMessage("Action flag must contain only alphabets"),
],
function(req, res, next) {
    var SessionUser = req.session.theUser;
    var SessionProfile = req.session.currentProfile;
    console.log(SessionProfile);

    if(SessionUser !== null && SessionUser !==undefined){
        if(req.query.actionFlag) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
            }
            switch(req.query.actionFlag){

                case 'signIn': // When action flag is signIn
                    var userItemObj = itemDb.getUserItemsfromdb();
                    userItemObj.then((data) => {
                        console.log("Session user exists for signIn" + data);
                        res.render('mybooks', {userItems: data, currentProfile: userProfile});
                    })
                break;

                case 'update': // When action flag is update

                        req.check('theItem','Invalid Item code').isInt()
                        .isIn(['1', '2', '3','4','5','6','7','8','9','10'])
                        .withMessage('Invalid Item code');
                        var errorsOnUp=req.validationErrors();
                        if (errorsOnUp){
                            // return res.status(422).json({ errors: errorsOnUp });
                            res.render('mybooks', {userItems: SessionProfile, currentProfile: userProfile, err: errorsOnUp});
                        }
                        console.log("update k under"+req.query.theItem);
                        var itemObj = itemDb.getItem(req.query.theItem);
                        itemObj.then((data) => {
                            console.log("feedback k under");
                            console.log(data);
                          res.render('feedback', { userItems: data, currentProfile: userProfile});
                        })
                break;

                case 'addItem': // When action flag is addItem
                if(req.query.theItem) {
                req.check('theItem','Invalid Item code').isInt().isIn(['1', '2', '3','4','5','6','7','8','9','10'])
                .withMessage('Invalid Item code');
                var errorsOnadd=req.validationErrors();
                console.log("xyz");
                if (errorsOnadd){
                    return res.status(422).json({ errors: errorsOnadd });
                    // res.render('mybooks',{ currentProfile: SessionProfile ,userItems:SessionProfile, error: errors2});
                  }
                    var userId = SessionUser.UserId;
                    var item = itemDb.getItem(req.query.theItem).then((data)=> {                   
                    userProfile.adduserItem(SessionProfile, data).then(function(useritem) {
                        console.log("add karne k baad");
                        SessionProfile = useritem;
                        req.session.currentProfile = SessionProfile;
                        res.render('mybooks', {userItems:useritem, currentProfile: SessionProfile})
                        },
                        function(err){
                            console.log(err);
                            res.render('mybooks', {err});
                        })
                    })                    
                }
                break;
                case 'delete': // When action flag is delete
                    if(req.query.theItem){
                        // const errors = validationResult(req);
                        // console.log("errors ither milega");
                        // console.log(errors);
                        // if (!errors.isEmpty()) {
                        //     return res.status(422).json({ errors: errors.array() });
                        // }
                        req.check('theItem','Invalid Item code').isInt().isIn(['1', '2', '3','4','5','6','7','8','9','10'])
                        .withMessage('Invalid Item code');
                        var errorsOndel=req.validationErrors();
                        console.log("xyz");
                        if (errorsOndel){
                            return res.status(422).json({ errors: errorsOndel });
                            // res.render('mybooks',{ currentProfile: SessionProfile ,userItems:SessionProfile, error: errors2});
                          }else{
                        var userItems = userProfile.removeItem(SessionProfile, req.query.theItem);
                        userItems.then((data)=> {
                        console.log("after deletion");
                        console.log(data);
                        SessionProfile = data;
                        //SessionProfile = req.session.currentProfile;
                        req.session.currentProfile = SessionProfile;

                        res.render('mybooks', {  User: user,  currentProfile: SessionProfile , userItems:data})

                        })
                    }
                        
                    }
                break;
                    case 'updateRating': // When action flag is updateRating
                    const errors1 = validationResult(req);
                    if (!errors1.isEmpty()) {
                        return res.status(422).json({ errors: errors1.array() });
                    }
                    req.session.currentProfile = SessionProfile;
                    if(req.query.actionFlag == 'updateRating'){
                        req.check('rating','Invalid rating').isInt();
                        req.check('theItem','Invalid Item code').isInt().isIn(['1', '2', '3','4','5','6','7','8','9','10'])
                        .withMessage('Invalid Item code');
                        var errors2=req.validationErrors();
                        if (errors2){
                            console.log("for errors under updaterating");
                            console.log(errors2);
                            return res.status(422).json({ errors: errors2 });
                            // res.render('mybooks',{ currentProfile: SessionProfile ,userItems:SessionProfile, error: errors2});
                          }else{
                            if(req.query.theItem){
                                if(req.query.rating > 5 && req.query.rating ==undefined)
                                {
                                res.render('mybooks', { User: user,  currentProfile: SessionProfile , userItems:SessionProfile});
                                }
                                var userItems = userProfile.updateItem(SessionProfile, req.query.theItem, req.query.rating).then(function(data) {
                                    SessionProfile = data;
                                    req.session.currentProfile = SessionProfile;
                                    res.render('mybooks', {  User: user,  currentProfile: SessionProfile , userItems:data})       
                                })
                            }
                          }
                    }
                    
                    break;
                    case 'boughtIt': // When action flag is boughtIt
                        const errorsBase = validationResult(req);
                        console.log(errorsBase);
                        if (!errorsBase.isEmpty()) {
                            return res.status(422).json({ errors: errorsBase.array() });
                        }
                        req.session.currentProfile = SessionProfile;
                        if(req.query.actionFlag == 'boughtIt'){
                            req.check('baughtIt', 'Invalid status')
                            .isIn(['Yes','No']);
                            req.check('theItem','Invalid Item code').isInt().isIn(['1', '2', '3','4','5','6','7','8','9','10'])
                            .withMessage('Invalid Item code');
                            var errors3=req.validationErrors();
                            if (errors3){
                            console.log("error3 idher milega");
                            console.log(errors3);
                            return res.status(422).json({ errors: errors3});
                            }else{
                            if(req.query.theItem){
                            var userItems = userProfile.updateItemStatus(SessionProfile, req.query.theItem,req.query.baughtIt).then(function(data) {
                            SessionProfile = data;
                            req.session.currentProfile = SessionProfile;
                            res.render('mybooks', {  User: user,  currentProfile: SessionProfile , userItems:SessionProfile})       
                            })
                        }             
                    } 
                }     
                case 'edit': // When action flag is boughtIt
                        // const errorsBase = validationResult(req);
                        // console.log(errorsBase);
                        // if (!errorsBase.isEmpty()) {
                        //     return res.status(422).json({ errors: errorsBase.array() });
                        // }
                        req.session.currentProfile = SessionProfile;
                        if(req.query.actionFlag == 'edit'){
                            // req.check('edit', 'Invalid action')
                            // .isAlpha()
                            req.check('theItem','Invalid Item code').isInt().isIn(['1', '2', '3','4','5','6','7','8','9','10'])
                            .withMessage('Invalid Item code');
                            var errors3=req.validationErrors();
                            if (errors3){
                            // console.log("error3 idher milega");
                            // console.log(errors3);
                            return res.status(422).json({ errors: errors3});
                            }else{
                            if(req.query.theItem){
                            var itemdetails = itemDb.getItem(req.query.theItem).then(function(data) {
                            // SessionProfile = data;
                            req.session.currentProfile = SessionProfile;
                            console.log("item details data");
                            console.log(data);
                            res.render('editItem', {  User: user,  currentProfile: SessionProfile , data:data})       
                            })
                        }             
                    } 
                }       

                    break;
                    case 'rateIt': // When action flag is rateIt
                    if(req.query.theItem){

                        req.check('theItem','Invalid Item code').isInt().isIn(['1', '2', '3','4','5','6','7','8','9','10'])
                        .withMessage('Invalid Item code');
                        var errorsOnRate=req.validationErrors();
                        console.log("xyz");
                        if (errorsOnRate){
                            return res.status(422).json({ errors: errorsOnRate });
                            // res.render('mybooks',{ currentProfile: SessionProfile ,userItems:SessionProfile, error: errors2});
                        }
                        var useritem = itemDb.getUserItemsfromdb();
                        useritem.then((data) => {
                        var c = 0;
                        for (let i=0; i < data.length; i++){
                            if (data[i].itemCode == req.query.theItem){
                                c++;
                                var itemObj = itemDb.getItem(req.query.theItem);
                                itemObj.then((itemdata) => {
                                res.render('feedback', { userItems: itemdata, currentProfile: userProfile });
                                })
                            }
                          }
                        if (c == 0){
                        var userId = SessionUser.UserId;
                        var item = itemDb.getItem(req.query.theItem);
                        item.then((data)=> {
                        var userItems = userProfile.adduserItem(SessionProfile, data).then(function(useritem) {
                        SessionProfile = useritem;
                        req.session.currentProfile = SessionProfile;
                        res.render('mybooks', {userItems:SessionProfile, currentProfile: SessionProfile})
                        })
                    })
                }       
            })
            break;
                }
            }
        }
             else {
                res.render('mybooks', {  User: user,  currentProfile: SessionProfile, userItems:SessionProfile});
            }
        }

        // When no session user
        else {
            if(req.query.actionFlag === 'signIn')
            {
                res.render('login');
            }
            else{
                var user = userDb.getUsers();
                user.then((data1) => {
                req.session.theUser = data1;
                var userProfile1 = userProfile.getUserProfile(data1[0].userId);
                req.session.currentProfile = userProfile1;
                userProfile1.then((data2) => {
                req.session.currentProfile = data2;
                res.render('mybooks', { userItems: data2, currentProfile: data2});

                })
            })   
            }
            
        }
});


/* POST route for login  */
router.post('/signIn', urlencodedParser, function(req, res)
    {
    if(req.body.emailId == ""  && req.body.password == "")
    {
        return res.status(422).json({ error: "Username and password can not be blank"});
    }
    req.checkBody('emailId', 'Invalid email').isEmail();
    req.checkBody("password", "Invalid password")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
    var errorsSignIn=req.validationErrors();
    if (errorsSignIn){
    console.log("errorsSignIn idher milega");
    console.log(errorsSignIn);
    console.log("1235");
    return res.status(422).json({ error: "Please enter valid username or password"});
    }else{
        if(req.body.emailId && req.body.password){
            var userData = userDb.getUserByEmail(req.body.emailId);
            userData.then((userdbData) => {
                if(userdbData !== null && userdbData !== undefined)
                {
                    let userId = userdbData.userId;
                    var userItemsObj = itemDb.getUserItemfromdb(userId);
                    userItemsObj.then((userItemdata) => {
                    res.render('mybooks', {userItems: userItemdata, currentProfile: userItemdata});
                    });
                }else{
                    res.render('login'); // Invalid username and password
                }        
            },function(err){
                console.log(err);
                res.render('login', {err}); // when incorrect username or password is passed
            });
        } else{
            res.render('login'); // when username and password is blank
        }       
    }
})


/* POST route for new user registration */
router.post('/register', urlencodedParser, function(req, res)
{
    if(req.body.emailId == ""  && req.body.psw == "")
    {
        return res.status(422).json({ error: "Username and password can not be blank"});
    }
    // req.checkBody('userId', 'Invalid username').isAlpha();
        req.checkBody('emailId', 'Invalid email').isEmail();
        req.checkBody("psw", "Invalid password")
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
    var errorsReg=req.validationErrors();
    if (errorsReg){
        return res.status(422).json({ error: "Please enter valid details"});
    }else{
        if(req.body.emailId && req.body.psw){
            var userData = userDb.postUser(req.body).then((response)=> {
                res.render('register');
            })
        } else{
            res.render('register'); // when username and password is blank
        }       

    }
})

/* POST route for new item addition in catalog page */
// router.post('/addNewItem', urlencodedParser, function(req, res)
// {
//     var categories = getCategories();
//     var newItemData = itemDb.postNewItem(req)
//     newItemData.then((msg) =>{ 
//         var itemData = itemDb.getItems();
//             itemData.then((idata) => {
//                 console.log("new item data");
//                 console.log(itemData);
//                 var categoryData = {
//                     title:'Categories',
//                     path: req.url,
//                     categorires: categories,
//                     items: idata
//                 }
//                 console.log("look for categoryData");
//                 res.render('Categories', {data: categoryData});
//             }); 
//         });       
// //    });
// })
router.post('/addNewItem', urlencodedParser, function(req, res)
{
    // var categories = getCategories();
    var newItemData = itemDb.postNewItem(req)
    newItemData.then((msg) =>{ 
         console.log("look for categoryData");
        res.render('addNewItem');
            }); 
})
//* POST route for editing the item *//
router.post('/editItem', urlencodedParser, function(req, res)
{
    // var categories = getCategories();
    var itemData = itemDb.editNewItem(req)
    itemData.then((data) =>{ 
        console.log("look for categoryData");
        res.render('item', {data: data});
    }); 
})

/* GET route for signOut */
router.get('/signout', function(req, res) {
    req.session.destroy(function(err) {
        var categories = getCategories();
        var itemData = itemDb.getItems().then((data)=> {
            var catData= {
                title:'Categories',
                path: req.url,
                categories: categories,
                items: data
            }
    
          res.render('Categories', { data: catData  });
        });

        })
        
  });

/* fetch categories from DB function */
var categories = [];
let getCategories = function() {
    var data = itemDb.getItems().then( data => {
    // console.log(data);
    data.forEach(function (item) {
        if(!categories.includes(item.catalogCategory)){
            categories.push(item.catalogCategory);
        }
        
    });
    });
    return categories;  
};


module.exports = router;
