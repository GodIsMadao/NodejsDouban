var mongoose = require('mongoose')
var config = require('./config.js')

module.exports=function()
{ 
	var db = mongoose.connect(config.mongodb); 
	db.connection.on("error",function(err){ 
	console.log("数据库链接失败"); 
	}); 
	db.connection.on("open",function(err){ 
		console.log("数据库链接成功"); 
	}); 
};