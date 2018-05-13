var express = require("express");
var router = express.Router();
var clientSessions = require('client-sessions');
var formidable = require('formidable');
var fs = require('fs');
var firsttime = true;


router.use(function onstartup (req, res, next) {
	if(firsttime == true){
		console.log("first time");
		req.session_state.reset();
		firsttime = false;
	}
  next();
});

router.get("/",function(request,response){
	response.sendFile(__dirname + "/public/views/homepage.html");
});
router.get("/login",function(request,response){
	response.sendFile(__dirname + "/public/views/login.html");
});
router.get("/signup",function(request,response){
	response.sendFile(__dirname + "/public/views/signup.html");
});
router.get("/items",function(request,response){
	if(request.session_state.login == true){
response.sendFile(__dirname + "/public/views/newItem.html");
} else{
response.sendFile(__dirname + "/public/views/homepage.html");
}
});
router.get("/cart",function(request,response){
	if(request.session_state.login == true){
	response.sendFile(__dirname + "/public/views/cart.html");
	} else{
	response.sendFile(__dirname + "/public/views/homepage.html");
	}
});
router.get("/admin",function(request,response){
	if(request.session_state.admin == true){
	response.sendFile(__dirname + "/public/views/admin.html");
	} else{
	response.sendFile(__dirname + "/public/views/homepage.html");
	}
});
router.get("/changePassword",function(request,response){
	response.sendFile(__dirname + "/public/views/changePass.html");
});

// Item Database
const dataBase2 = require('./databaseItem');

let db2 = new dataBase2();

router.get("/additem",function(req,res){
	    res.sendFile(__dirname + "/public/views/newItem.html");
});

 	router.post('/additem', function (req, res) {
		console.log(req.body);
		var obj = {name:req.body.name,picture:req.body.picture,
		price:req.body.price,category:req.body.category,description:req.body.description};
				res.json(db2.addObject(obj));
 });





////////////////////////////////////////////////////
const myDatabase = require('./myDatabase');

let db = new myDatabase();



//add or modify.  Use addObject and no need for index.
//                ident should be part of object.
router.get("/userInfo",function(req,res){
	if(!db.infoList[0] && !req.session_state.username == "admin"){
		console.log("nope");
		req.session_state.reset();
		return res.json({anything: "/login"});
	} else{
		console.log("Hey man iasd falsdfkja;ldfkja;sdflkja;dlfkj");
		return res.json({username:req.session_state.username, loginState:req.session_state.login});
		}
});
router.get("/getUsernames",function(req,res){
	for(i=0;i<db.infoList.length;i++){
		console.log(db.getUsernames());
		return res.json(db.getUsernames());
	}
});

router.get("/logout",function(req,res){
	req.session_state.reset();
	res.redirect('/');
});
router.post('/checklogin', function(req, res){
	for(i=0;i<db.infoList.length;i++){
		if(db.infoList[i].username == req.body.username && db.infoList[i].password == req.body.password){
			console.log("Log in approved");
			req.session_state.admin = false;
			req.session_state.login = true;
			req.session_state.username = req.body.username;
			req.session_state.password = req.body.password;
			return res.json({redirect:"/"});
		}
	}
		if(req.body.username == "admin" && req.body.password == "password"){
			console.log("Hello admin");
			req.session_state.admin = true;
			req.session_state.login = true;
			req.session_state.username = req.body.username;
			req.session_state.password = req.body.password;
			return res.json({redirect:"/"});
		} else{
			return res.json(null);
		}
});
router.post('/signup', function(req, res){
	if (req.body.username == "" || req.body.username == "admin") {
		console.log("null????");
		return res.json(null);
	}
	console.log("not null????");
	let obj = {username:req.body.username, password:req.body.password};
	req.session_state.admin = false;
	req.session_state.login = true;
	req.session_state.username = req.body.username;
	req.session_state.password = req.body.password;
	return res.json(db.addObject(obj));
});
router.put('/updatePassword', function(req, res){
	if (req.body.username == "" || req.body.password == "" || req.body.newPass == "") {
		return res.json(null);
	}
	let obj = {username: req.body.username,password: req.body.password,newPass: req.body.newPass};
	if(db.changeObject(obj)){
		console.log("returned true");
		if(req.session_state.username == req.body.username && req.session_state.password == req.body.password){
			req.session_state.reset();
			return res.json(obj);
		}
		return res.json(obj);
	}
	return res.json(null);
});

router.delete('/deleteLogin', function(req, res){
	if (req.body.username == "") {
		console.log("enter a name");
		res.json(null);
	} else{
		let tempobj = {username:req.body.username};
		console.log("deleting");
		return res.json(db.deleteObjectWithID(tempobj));
	}

});

const dataBase3 = require('./databasecart');

let db3 = new dataBase3();





router.get('/cart2', function (req, res) {
	console.log("get");
	if(req.session_state.login)
	{
		console.log("sessions of get");

		 res.json(db3.getAllObjectsName(req.session_state.username));
		}
		else {
			console.log("ret null get");
		return	res.json({redirect: "/login"})
		}



});

 router.post('/cart', function (req, res) {

	 console.log(req.body);
	 if(req.session_state.login)
	 {
		 console.log("sessions of post");
	 var obj = {name:req.body.itemName, index: req.body.index, price: req.body.price,username:req.session_state.username};
	 	return	res.json(db3.addObject(obj));

}
else {
	console.log("ret null post");
	return res.json(null);
}
console.log("fail posts");
		return 	 res.json();
});
router.put('/updatePassword', function(req, res){
	if (req.body.username == "" || req.body.password == "" || req.body.newPass == "") {
		return res.json(null);
	}
	let obj = {username: req.body.username,password: req.body.password,newPass: req.body.newPass};
	if(db.changeObject(obj)){
		console.log("returned true");
		if(req.session_state.username == req.body.username && req.session_state.password == req.body.password){
			req.session_state.reset();
			return res.json(obj);
		}
		return res.json(obj);
	}
	return res.json(null);
});
router.delete('/cart', function (req, res) {



			res.json(db3.deleteObjectWithID(req.body.index));
});

module.exports = router;
