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
app.post("/api/usersignup", (req, res) => {
  var { errors, isValid } = signUpValidator(req.body);
  if (!isValid) {
    res.status(400).json(errors)
  }
  Users.selectOne({ username: req.body.newUser }, (err, data) => {
    console.log(req.body)
    if (err) {
      var hash = bcrypt.hashSync(req.body.newPassword, 8);
      let newUser = { username: req.body.newUser, password: hash };

      console.log('this is ', Users)

      Users.save(newUser, (err, result) => {
        if (err) {
          console.log(err)
        }
        else console.log('user added successfully')
      })

    }
    else console.log('user already exists')
  })

})
app.post("/api/usersignin", (req, res) => {
  var { errors, isValid } = signInValidator(req.body);
  if (!isValid) {
    res.status(400).json(errors)
  }
  else
    Users.selectOne({ username: req.body.username }, (err, data) => {
      if (err) {
        res.status(400).json('user not found')

      } else {
        // Check password
        password = req.body.password
        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            // User matched
            // Create JWT Payload
            const payload = {
              id: user.id,
              name: user.name
            };
            // Sign token
            jwt.sign(
              payload,
              keys.secretOrKey,
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
        });
      }


    })

})

app.use(express.static(__dirname + "/../react-client/dist"));

app.listen(3000, function () {
  console.log("listening on port 3000!");
});
