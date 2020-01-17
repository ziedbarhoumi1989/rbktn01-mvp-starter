var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

var items = require("../database-mongo");
var Users = require("../database-mongo/models/user.js");
var posts = require("../database-mongo/models/posts.js");
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
app.post('/api/posts/add', (req, res) => {
  var data = req.body;
  console.log(data)
})
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
              id: data._id,
              email: data.email
            };
            // Sign token
            jwt.sign(
              payload,
              'this is a secret',
              {
                expiresIn: 3600 // 1 hourin seconds
              },
              (err, token) => {
                res.json({
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

app.use(express.static(__dirname + "/../react-client/dist"));

app.listen(3000, function () {
  console.log("listening on port 3000!");
});
