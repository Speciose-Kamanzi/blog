var express = require('express');
var router = express.Router();
var Posts = require('../db.json');
var request = require('request');

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(Posts);
  res.render('index', { title: 'Home', posts: Posts.posts });
});

/* posts page. */
router.get('/posts', function (req, res, next) {
  console.log(Posts);
  res.render('posts', { title: 'posts', posts: Posts.posts });
});

/* create new page. */
router.get('/new', function (req, res, next) {
  res.render('new', { title: "New Posts" });
});

// login page
router.get('/login', function (req, res, next) {
  res.render('login', {
    title: "Login",
    posts: Posts.posts,
    users: Posts.users,
    message: false
  });

});
router.post('/login', function (req, res, next) {
  var users = Posts.users;
  console.log(users);

  var username = req.body.username;
  var password = req.body.password;

  console.log("Username: "+username+"======="+" Password: "+password);

  for (let i = 0; i < users.length; i++) {

    
    if (username == users[i].username && password == users[i].password) {
      res.render('index', { title: 'Home', posts: Posts.posts });
      break;
    } else{
      console.log("Isn't working");
      
      res.render('login', {
        title: "Login",
        posts: Posts.posts,
        users: Posts.users,
        message: "Username or password inccorect"
      });
    }
  }


});


router.get('/login', function (req, res, next) {
  res.render('login', {
    title: 'Login'
  });
});


// register
router.post('/register', function (req, res, next) {
  var id = Posts.users[Posts.users.length - 1].id + 1;

  var obj = {
    "id": reeq.body.id,
    "username": req.body.username,
    "password": req.body.password,
    "email": req.body.email
  }
  request.post({

    url: "http://localhost:3004/users",
    body: obj,
    json: true
  }, function (error, response, body) {
    res.redirect('/');

  });
});

// view page
router.get('/view/:id', function (req, res, next) {
  var id;
  var post = Posts.posts;

  for (var i = 0; i < post.length; i++) {
    if (post[i].id == req.params.id) {
      id = i;
    }
  }
  res.render('view', { title: 'view posts', posts: Posts.posts, id: id });

});



// edit page
router.get('/edit/:id', function (req, res, next) {
  var id;
  var post = Posts.posts;

  for (var i = 0; i < post.length; i++) {
    if (post[i].id == req.params.id) {
      id = i;
    }
  }
  res.render('edit', { title: 'edit posts', posts: Posts.posts, id: id });

});

router.post("/edit/:id", function (req, res, next) {
  // console.log(req.params.id)
  request({
    url: "http://localhost:3004/posts/" + req.params.id,
    method: "PATCH",
    form: {
      "title": req.body.title,
      "author": req.body.author,
      "date": req.body.date,
      "content": req.body.content
    },
    function(error, response, body) {
      res.render("index", { message: "successfully added" });
    }
  })
  res.redirect("/")
});

// delete post
router.get('/delete/:id', function (req, res, next) {
  request({
    url: "http://localhost:3004/posts/" + req.params.id,
    method: "DELETE",
    function(error, response, body) {
      res.render("index", { message: "successfully deleted" });
    }
  })
  res.redirect("/");

});


router.post("/new", function (req, res, next) {
  let obj = {
    "title": req.body.title,
    "author": req.body.author,
    "date": req.body.date,
    "content": req.body.content
  }

  request.post({
    url: 'http://localhost:3004/posts',
    body: obj,
    json: true

  }, function (error, response, body) {
    res.redirect('/');
  });
});

router.post('/new', function (req, res, next) {
  res.send(req.body);
});

/* contact page. */


module.exports = router;
