var item = require('../views/item.ejs')
var feedback = require('../views/feedback.ejs')
// var feedback = require('../views/feedback.ejs')

function mybooks()
{
	window.open("/mybooks",'_self', false);
}

function item()
{
	console.log("Hi");
	// window.open("http://127.0.0.1:8082/categories/item/2",'_self', false);/categories/item/:itemCode
	window.open("/categories/item/2",'_self', false);
}
function back()
{
	window.open("/categories", '_self', false);
}
function feedback()
{
	window.open("/feedback", '_self', false);
	console.log("Hi");
}
function myPassword() {
	var x = document.getElementById("myInput");
	if (x.type === "password") {
	  x.type = "text";
	} else {
	  x.type = "password";
	}
}