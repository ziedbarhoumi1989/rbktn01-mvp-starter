const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const db = require('../index.js');
let UserSchema = mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  Friends: String
})


const selectAll = function (callback) {
  UserModel.find({}, callback)
}
const save = function (user, callback) {
  UserModel.create(user, callback)
}
const selectOne = function ({ username }, callback) {
  UserModel.findOne({ username }, callback)
}

let UserModel = mongoose.model('users', UserSchema)
module.exports.Users = UserModel;
module.exports.selectAll = selectAll;
module.exports.selectOne = selectOne;
module.exports.save = save;


