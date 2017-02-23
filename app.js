/**
 * Created by Administrator on 2016/9/12.
 */
var express = require("express");
var path = require('path');
var mongoose = require('mongoose');
var _ = require('underscore');
var Movie = require('./models/movie');
var user = require('./models/user');
var bodyParser = require("body-parser");
var port = process.env.PORT || 3000;
var app = express();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/movie");
app.use(bodyParser.urlencoded({extended:true}));
// app.use(require('body-parser').urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));//静态文件配置的目录
app.set('views','./views/pages');
app.set('view engine','jade');
app.locals.moment = require('moment')
app.listen(port);

console.log('imooc start:'+ port);

//index page
app.get('/',function(req,res){
    Movie.fetch(function (err, movies) {
        if(err){
            console.log(err);
        }
        res.render('index',{
            title:'爱看不看首页',
            movies: movies
        });
    })

} );

//sign up

app.post('/user/signup',function (req,res) {
    // body...
    var _user = req.body.user
    console.log(_user)
})

//detail page
app.get('/movie/:id', function(req, res) {
    var id = req.params.id;
    Movie.findById(id,function (err, movie) {
        console.log("来来来，先看这里："+movie+","+movie.title)
        if(err){
            console.log(err);
        }

        console.log("来来来，再看这里："+movie+","+movie.title)
        res.render('detail', {
            title: '爱看不看:' + movie.title,
            movie: movie
        })

    })
})

//admin page
app.get('/admin/movie', function(req, res) {
    res.render('admin', {
        title: '爱看不看后台录入页',
        movie: {
            title: '',
            doctor: '',
            country: '',
            year: '',
            poster: '',
            flash: '',
            summary: '',
            language: ''
        }
    })
})

//admin update movie
app.get('/admin/update/:id',function (req, res) {
    var id= req.params.id;

    if (id) {
        Movie.findById(id, function (err,movie) {
            res.render('admin',{
                title:'爱看不看后台更新页',
                movie:movie
            })

        })
    }
})

//admin post movie
app.post('/admin/movie/new',function (req, res) {
	console.log("req.body:"+req.body)
	console.log("req.body.movie:"+req.body.movie)
	console.log("req.body.movie.title:"+req.body.movie.title)
	console.log("req.body.movie.doctor:"+req.body.movie.doctor)
	console.log("req.body.movie.language:"+req.body.movie.language)
    var id = req.body.movie._id;
    console.log("id为:"+id)
    var movieObj = req.body.movie;
    var _movie ;
    if(id!==undefined && id !== "" && id !== null){
        Movie.findById(id,function (err,movie) {
            if (err) {
                console.log(err);
            }
            console.log("前台传来的movieobj:"+movieObj)
            console.log("前台传来的movie:"+movie)
            _movie = _.extend(movie, movieObj);
            console.log("之后的movie:"+movie)
            _movie.save(function (err,movie) {
                if (err){
                    console.log(err);
                }

                res.redirect('/movie/' + movie._id)
            })
        })
    }else{
        _movie = new Movie({
            doctor:movieObj.doctor,
            title:movieObj.title,
            country:movieObj.country,
            language:movieObj.language,
            year:movieObj.year,
            poster:movieObj.poster,
            summary:movieObj.summary,
            flash:movieObj.flash
        });

        _movie.save(function (err,movie) {
            if (err){
                console.log(err);
            }

            res.redirect('/movie/' + movie._id)
        })
    }
});


//list page
app.get('/admin/list', function(req, res) {
    Movie.fetch(function (err, movies) {
        if(err){
            console.log(err);
        }

        res.render('list',{
            title:'爱看不看列表页',
            movies: movies
        });
    });
});

//delete page
app.delete('/admin/list',function(req,res){
    var id = req.query.id
//http://localhost:3000/admin/list?id=58a2625acd8bda2720813ec7 
// req.query.id获取?id=后面的id内容，然后通过后面语句删除对应内容
    if(id){
        Movie.remove({_id:id},function(err,movie){
            if(err){
                console.log(err)
            }
            else{
                res.json({success:1})
            }
        })

    }
})