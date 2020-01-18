const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const db = require('../index.js');
let postsSchema = mongoose.Schema({
  createdById: Object,
  content: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

})



const selectAll = function (callback) {
  PostsModel.find({}, callback)
}
const save = function (post, callback) {
  PostsModel.create(user, callback)
}
const selectOne = function (id, callback) {
  PostsModel.findOne({ id: id }, callback)
}

let PostsModel = mongoose.model('posts', postsSchema)

module.exports.posts = PostsModel;
module.exports.selectAll = selectAll;
module.exports.selectOne = selectOne;
module.exports.save = save;
