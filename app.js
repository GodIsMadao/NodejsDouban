// 入口文件
var express = require('express')
var path=require('path')
var bodyParser = require('body-parser')
var port = process.env.PORT || 3000
var app = express()

app.set('views','./views/pages')
app.set('view engine','jade')
// app.use(express.bodyParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname,'bower_components')))
app.listen(port)

console.log('immoooc started on port '+ port )

//编写路由,url规则
app.get('/',function(req,res){
	res.render('index',{
		title:'sy首页',
		movies:[{
			title:'机械战警',
			_id:1,
			poster:'http://img5.duitang.com/uploads/item/201508/02/20150802205414_xLSFQ.jpeg'
		},{
			title:'机械战警',
			_id:2,
			poster:'http://img5.duitang.com/uploads/item/201508/02/20150802205414_xLSFQ.jpeg'
		},{
			title:'机械战警',
			_id:3,
			poster:'http://img5.duitang.com/uploads/item/201508/02/20150802205414_xLSFQ.jpeg'
		}]
	})
})

app.get('/movie/:id',function(req,res){
	res.render('detail',{
		title:'sy详情页面',
		movie:{
			doctor:'宋昀',
			country:'中国',
			title:'机械战警',
			year:2015,
			poster:'http://img5.duitang.com/uploads/item/201508/02/20150802205414_xLSFQ.jpeg',
			language:'美国',
			flash:'',
			summary:'lalalalalalal'
		}
	})
})
app.get('/admin/movie',function(req,res){
	res.render('admin',{
		title:'sy后台录入页面',
		movie:{
			title:'',
			doctor:'',
			country:'',
			year:'',
			poster:'',
			flash:'',
			summary:'',
			language:''
		}
	})
})
app.get('/admin/list',function(req,res){
	res.render('list',{
		title:'sy列表页面',
		// movies:{
		// 	doctor:'宋昀',
		// 	country:'中国',
		// 	title:'机械战警',
		// 	year:2015,
		// 	poster:'http://img5.duitang.com/uploads/item/201508/02/20150802205414_xLSFQ.jpeg',
		// 	language:'美国',
		// 	flash:'',
		// 	summary:'lalalalalalal'
		// }
		movies:[{
			title:'机械战警',
			_id:1,
			doctor:'张三',
			country:'中国',
			year:2015,
			poster:'http://img5.duitang.com/uploads/item/201508/02/20150802205414_xLSFQ.jpeg',
			language:'美国',
			flash:'',
			summary:'lalalalalalal'
		},{
			title:'机械战警',
			doctor:'李四	',
			country:'中国',
			year:2015,
			poster:'http://img5.duitang.com/uploads/item/201508/02/20150802205414_xLSFQ.jpeg',
			language:'美国',
			flash:'',
			summary:'lalalalalalal',
			_id:2
		},{
			title:'机械战警',
			doctor:'宋昀',
			country:'中国',
			year:2015,
			poster:'http://img5.duitang.com/uploads/item/201508/02/20150802205414_xLSFQ.jpeg',
			language:'美国',
			flash:'',
			summary:'lalalalalalal',
			_id:3
		}]
	})
})