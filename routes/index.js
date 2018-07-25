var express = require('express');
var router = express.Router();
var Posts = require('../db.json');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(Posts);
  res.render('index', { title: 'Home', posts: Posts.posts });
});

/* posts page. */
router.get('/posts', function(req, res, next) {

  res.render('posts', { title: 'posts', posts: Posts.posts });
});

/* create new page. */
router.get('/new', function(req, res, next) {
  
  res.render('new', { title: "New Posts"});
});

// edit page
router.get('/edit/:id', function(req, res, next) {
  var id;
  var post = Posts.posts; 

   for(var i= 0; i < post.length; i++){
     if(post[i].id == req.params.id){
       id = i;
   }
  }
  res.render('edit', { title: 'edit posts', posts: Posts.posts, id: id });
   
});

router.post("/edit/:id", function(req, res, next){
  console.log(req.params.id)
  request({
    url:"http://localhost:3000/posts/"+req.params.id,
    form:{
    "title": req.body.title, 
    "author": req.body.author,
    "date":req.body.date,
    "content": req.body.content
  },
  function(error,response,body){
    res.render("index", {message: "successfully added"});
  }
  })
    res.redirect("/")
  request.post({
    url: 'http://localhost:3004/posts',
    body:obj,
    json:true
  
  }, function(error, response, body){
    res.redirect('/');
  });
});

// delete post
router.get('/delet/:id', function(req, res, next){
 request({
   url:"http://localhost:3004/posts"+req.params.id,
   method:"DELETE",
   function(error,response,body){
     res.render("index", {message:"successfully deleted"});
   }
 })
 res.redirect("/");

});


router.post("/new", function(req, res, next){
  let obj ={
    "title": req.body.title, 
    "author": req.body.author,
    "date":req.body.date,
    "content": req.body.content
  }

  request.post({
    url: 'http://localhost:3004/posts',
    body:obj,
    json:true
  
  }, function(error, response, body){
    res.redirect('/');
  });
});

router.post('/new', function(req, res, next){
  res.send(req.body);
});

/* contact page. */


module.exports = router;
