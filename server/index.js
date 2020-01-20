var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

var items = require("../database-mongo");
var Users = require("../database-mongo/models/user.js");
var posts = require("../database-mongo/models/posts.js");
var Comments = require("../database-mongo/models/comments.js");
var signUpValidator = require('./validation/signupValidation')
var signInValidator = require('./validation/signinValidation')
var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
// app.get("/", (req, res) => {
//   console.log("here");
//   console.log('the user collection \n', Users)
//   res.redirect("/signin");

// });
app.use(express.static(__dirname + "/../react-client/dist"));
app.get("/", (req, res) => {
  console.log("the users are", users);
  console.log('the user collection \n', Users)
  res.redirect("/signin");

});

app.get("/signin", (req, res) => {
  res.sendFile(path.join(__dirname, "../react-client/dist/index.html"));
});
app.post("/user", (req, res) => {
  res.send('request handled')
});
app.get('/user', (req, res) => {
  //res.send('hello')
  res.sendFile(path.join(__dirname, "../react-client/dist/index.html"));
})
app.get('/home', (req, res) => {
  //res.send('hello')
  res.sendFile(path.join(__dirname, "../react-client/dist/index.html"));
})
app.get('/updateProfile', (req, res) => {
  //res.send('hello')
  res.sendFile(path.join(__dirname, "../react-client/dist/index.html"));
})

/////////////friends route////////////////////////////
app.post('/api/friends', (req, res) => {
  Users.selectAllByByUserName(req.body.srchTerm, (err, users) => {
    if (err) {
      console.log(err)
    } else if (users.length === 0) {
      res.status(400).json({ message: 'no such user found' })
    }
    else {
      res.status(200).json(users)
    }
  })
})
app.post('/api/friends/addFriend/:userId', (req, res) => {
  users.selectOneById({ _id: req.params.id }, (err, result) => {
    if (err || !result) {
      console.log(err)
      res.status(400).json(err)
    } else {
      result[0]["friends"].push(req.body)
      Users.save(result[0], (err, data) => {
        if (err) {
          console.log(err)
        } else {
          res.status(200).json({ message: 'friend successfully added' })
        }
      })
      res.status(200).json(data)
    }
  })
})
app.post('/api/friends/removeFriend/:userid', (req, res) => {
  Users.selectOneById({ _id: req.params.id }, (err, data) => {
    if (err || data.length === 0) {
      res.status(400).json({ message: 'User update settings failed' })
    }
    else {
      var arr = data[0]['friends']
      for (var i = 0; i < arr.length; i++) {
        if (arr[i]._id === red.body.id) {
          arr.splice(arr.indexOf(req.body), 1)
          break;
        }
      }
      res.status(200).json({ message: `${req.body.username} is no longer a friend` })
    }
  })
})
//****************END OF FRIENDS ROUTES */

//****************SIGNUP AN SIGNIN ROUTES */
app.post("/api/usersignup", (req, res) => {
  var { errors, isValid } = signUpValidator(req.body);
  if (!isValid) {
    res.status(400).json(errors)
  }
  else {
    Users.selectOne(req.body.newEmail, (err, data) => {
      console.log(data)
      if (err) {
        console.log(err)
      }
      else if (data.length > 0) {

        return res.send('user already exists')
      }
      else if (data.length === 0) {
        var hash = bcrypt.hashSync(req.body.newPassword, 8);
        var newUser = {
          username: req.body.newUser,
          password: hash,
          age: req.body.newAge,
          Email: req.body.newEmail,

          Friends: [],
        }

        //console.log('this is ', Users)

        Users.save(newUser, (err, result) => {
          if (err) {
            console.log(err)
          }
          else res.send('user added successfully')
        })
      }



    })
  }

})
app.post("/api/usersignin", (req, res) => {
  // console.log('this is the request', req.body)
  var { errors, isValid } = signInValidator(req.body);
  if (!isValid) {
    res.status(400).json(errors)
  }
  else {
    Users.selectOne(req.body.email, (err, data) => {
      console.log(data)
      if (err) {
        console.log(err)

      } else if (data.length === 0) {
        res.status(400).json({ message: 'user not found' })
      }
      else {
        // Check password
        password = req.body.password
        bcrypt.compare(password, data[0].password).then(isMatch => {
          if (isMatch) {
            // User matched
            // Create JWT Payload
            const payload = {
              id: data[0]._id,
              email: data[0].Email
            };
            console.log(payload)
            // Sign token
            jwt.sign(
              payload,
              'this is a secret',
              {
                expiresIn: 3600 // 1 hourin seconds
              },
              (err, token) => {
                res.json({
                  payload,
                  success: true,
                  token: "Bearer " + token
                });
              }
            );
          } else {
            return res
              .status(400)
              .json({ passwordincorrect: "Password incorrect" });
          }
        })
          .catch(err => console.log(err));


      }


    })
  }

})
//****************************END OF SIGNIN AND SIGNUP ROUTES */

//****************************GET THE USER INFORMATION */
app.get('/api/user/:userid', (req, res) => {
  console.log(req.body);
  Users.selectOneById(req.params.id, (err, data) => {
    console.log('data from getting user id is', data)
    if (err || !data) {
      console.log(err)
      res.status(400).json(err)
    } else {
      res.status(200).json(data)
    }

  })
})



//*******************************************POSTS AND COMMENTS */


/////****************************************POSTS ROUTES */
app.get('/api/posts', (req, res) => {
  Users.selectOneById(req.body.id, (err, data) => {
    console.log(data)
    if (err || data.length === 0) {
      res.status(400).json({ message: 'no posts to show' })
    }
    else {
      var result = []
      var arr = data[0]['friends']
      for (var i = 0; i < arr.length; i++) {
        posts.selectByUserId(req.body.id, (err, post) => {
          if (!err && post) {
            result.push(post)
          }
        })
      }
      res.status(200).json(result)
    }
  })

})
app.post('/api/posts/delete/:postId', (req, res) => {
  posts.selectOneById(req.params.postId, (err, result) => {
    if (err || result.length === 0) {
      res.status(400).json({ message: 'delete post disabled' })
    }
    else {
      if (data[0].createdById === req.bod.id) {
        posts.Delete(req.parmas.id, (err, data) => {
          if (err) {
            console.log(err)
            res.status(400).json(error)
          }
          else {
            res.status(200).json({ message: 'post successfully deleted' })
          }
        })
      }
    }
  })
})
app.post('/api/posts/add', (req, res) => {
  var data = req.body;
  console.log(data)
  var newPost = {}
  newPost.createdById = req.body.id
  newPost.content = req.body.newPost
  newPost.createdAt = Date.now()
  posts.save(newPost, (err, result) => {
    if (err) {
      console.log(err)
    }
    else {
      console.log('post successfully added')
      res.status(200).json(result)
    }
  })

})
/////////////END OF  POSTS ROUTES///////////////////////

///*************************************COMMENTS ROUTS */
app.post('api/comments/addComment/:postid', (req, res) => {
  posts.selectOneById(req.params.id, (err, result) => {
    if (err || result.length === 0) {
      res.status(400).json({ message: 'no posts to comment' })
    }
    else {
      var comment = {}
      comment.createdById = req.body.id;
      comment.postId = req.params.postId
      comment.content = req.body.commentText
      comment.createdAt = Date.now()
      result[0]['commments'].push(comment)
      posts.save(result[0], (err, data) => {
        if (err) {
          console.log(err)
        }
        else {
          console.log('post successfully added')
        }
      })
      comments.save(comment, (err, data) => {
        if (err) {
          res.status(400).json(err)
        } else {
          res.status(200).json(data)
        }
      })

    }
  })
})

app.post('api/comments/delete/:commentid', (req, res) => {
  comments.Delete(req.params.commentid, (err, result) => {
    if (err) {
      res.status(400).json({ message: "can't delete this comment try again later" })
    }
    else {
      res.status(200).json({ message: 'comment successfully deleted' })
    }
  })
})


app.use(express.static(__dirname + "/../react-client/dist"));

app.listen(3000, function () {
  console.log("listening on port 3000!");
});
