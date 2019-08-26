var express = require('express');
const helmet = require('helmet')
var session= require('express-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
const mongoose = require('mongoose')
const expressValidator = require('express-validator');
const router = express.Router()

var app = express();
var catalogController = require('./controller/catalogController.js');
var profileController = require('./controller/profileController.js');

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.use('/Javascript', express.static('Javascript'));
app.use(expressValidator());
app.use(helmet());
app.use (session ({secret : "Expectopatrona"}));

mongoose.connect('mongodb://localhost/book');
const mongodb = mongoose.connection

mongodb.on('connected', function() {
  console.log('Mongoose default connection open to ')
})
// If the connection throws an error
mongodb.on('error', function(err) {
  console.log('Mongoose default connection error: ' + err)
})
// When the connection is disconnected
mongodb.on('disconnected', function() {
  console.log('Mongoose default connection disconnected')
})

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/about', function(req, res) {
    res.render('about');
});
app.get('/contact', function(req, res) {
    res.render('contact');
});
app.get('/feedback', function(req, res) {
    res.render('feedback');
});
app.get('/register', function(req, res) {
    res.render('register');
});
app.get('/addNewItem', function(req, res) {
    res.render('addNewItem');
});


//  catalogue routes defining
app.use('/', profileController);
app.use('/', catalogController);

app.use('/mybooks', profileController);
app.post('/signIn', profileController);
app.post('/register', profileController);
app.post('/addNewItem', profileController);
// router.get('/mybooks', profileController.validate(), profileController);
app.use('/signout', profileController);
 app.use('/categories',catalogController);
app.use('/mybooks',catalogController);
// app.use('/Categories/:categoryName',catalogController);
app.use('/categories/item/:itemCode',catalogController);


app.listen(8082, function(){
    console.log('app started')
    console.log('listening on the port 8082')
})