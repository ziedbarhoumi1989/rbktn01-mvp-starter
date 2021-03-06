const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const db = require('../index.js');
let postsSchema = mongoose.Schema({
  createdById: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  comments:[Object]

})



const selectAll = function (callback) {
  PostsModel.find({}, callback)
}
const save = function (post, callback) {
  PostsModel.create(post, callback)
}
const selectOne = function (id, callback) {
  PostsModel.findOne({ _id: id }, callback)
}
const selectByUserId = function (id, callback) {
  PostsModel.findOne({ createdById: id }, callback)
}
const update = function(id,content,callback) {
  PostsModel.findByIdAndUpdate({_id:id},{content},callback)
}
const Delete = function(id,callback) {
  PostsModel.findByIdAndRemove({_id:id},callback)
}

let PostsModel = mongoose.model('posts', postsSchema)

module.exports.posts = PostsModel;
module.exports.selectAll = selectAll;
module.exports.selectOne = selectOne;
module.exports.update = update;
module.exports.Delete = Delete;
module.exports.save = save;
module.exports.selectByUserId = selectByUserId;
