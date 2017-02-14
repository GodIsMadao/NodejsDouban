var express = require('express'); 

var router = express.Router(); 

var mongoose = require('mongoose'); 
var movieModel = mongoose.model('movie');
//localhost:3000/admin/new 
router.get("/new",function(req,res){ 
	res.render(
		'control.jade',
		{ 
			title:'后台电影添加页', 
			movie:{ 
				title:'', 
				director:'', 
				country:'', 
				language:'', 
				year:'', 
				poster:'', 
				summary:'', 
				flash:'' 
			} 
		}); 
});

var express = require('express'); 
var router = express.Router(); 
//localhost:3000/admin/new 
router.get("/new",function(req,res){ 
	res.render(
		'control.jade',
		{ 
			title:'后台电影添加页', 
			movie:{ 
				title:'', 
				director:'', 
				country:'', 
				language:'', 
				year:'', 
				poster:'', 
				summary:'', 
				flash:'' 
			} 
		}); 
});