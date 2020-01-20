const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const db = require('../index.js');
let commentsSchema = mongoose.Schema({
  createdById: String,
  postId: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },


})



const selectAll = function (callback) {
  commentsModel.find({}, callback)
}
const selectAllByPostId = function (postId, callback) {
  commentsModel.find({ postId: postId }, callback)
}
const save = function (comment, callback) {
  commentsModel.create(comment, callback)
}
const selectOne = function (id, callback) {
  commentsModel.findOne({ _id: id }, callback)
}
const update = function (id, content, callback) {
  commentsModel.findOneAndUpdate({ _id: id }, { content }, callback)
}
const Delete = function (id, callback) {
  commentsModel.findOneByIdAndRemove({ _id: id }, callback)
}

let commentsModel = mongoose.model('comments', commentsSchema)

module.exports.comments = commentsModel;
module.exports.selectAll = selectAll;
module.exports.selectOne = selectOne;
module.exports.update = update;
module.exports.Delete = Delete;
module.exports.save = save;