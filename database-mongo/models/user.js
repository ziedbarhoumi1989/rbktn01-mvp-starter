const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const db = require('../index.js');
let UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  age: Number,
  Email: { type: String, unique: true, required: true },
  //img: { data: Buffer, contentType: String },
  Friends: [Object]
}

)


const selectAllByByUserName = function (username, callback) {
  UserModel.find({ username: username }, callback)
}
const save = function (user, callback) {
  UserModel.create(user, callback)
}
const selectOne = function (email, callback) {
  UserModel.find({ Email: email }, callback)
}
const selectOneById = function (id, callback) {
  UserModel.find({ _id: id }, callback)
}
const update = function(id,content,callback) {
  UserModel.findByIdAndUpdate({id:id},{content},callback)
}
const Delete = function(id,callback) {
  UserModel.findByIdAndRemove({_id:id},callback)
}


let UserModel = mongoose.model('users', UserSchema)
module.exports.Users = UserModel;
module.exports.selectAllByByUserName = selectAllByByUserName;
module.exports.selectOne = selectOne;
module.exports.selectOneById = selectOneById;
module.exports.save = save;


