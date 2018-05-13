var express = require("express");
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var itemNumber = 10;
var data = require('./databaseItem')

let db = new data();

router.get("/",function(req,res){
	    res.sendFile(__dirname + "/public/views/index.html");
});

router.post('/upload', function(req, res){
console.log("upload");
		res.json({});
});
router.get('/getItems',function(req,res){
    res.json(db.getAllObjects());
});

router.post('/fileupload', function(req, res){

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
    var oldpath = files.filetoupload.path;
    var newpath = __dirname + '/public/images/' + files.filetoupload.name;
		var picturei =  '/public/images/' + files.filetoupload.name;

		// console.log('in post ' + fields.name + ' ' + fields.price + ' ' + fields.description + ' ' + picturei);

     db.addObject({name:fields.name,price:fields.price,picture:picturei,description:fields.description,number:itemNumber});
		 itemNumber++;
    fs.rename(oldpath, newpath, function (err) {
    if (err) throw err;
        res.redirect("/");
      });
    });
});


module.exports = router;
