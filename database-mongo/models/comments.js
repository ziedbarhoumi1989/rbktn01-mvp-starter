const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const db = require('../index.js');
let commentsSchema = mongoose.Schema({
  createdById: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  comments:[Object]

})



const selectAll = function (callback) {
  commentsModel.find({}, callback)
}
const save = function (post, callback) {
  commentsModel.create(post, callback)
}
const selectOne = function (id, callback) {
  commentsModel.findOne({ id: id }, callback)
}
const update = function(id,content,callback) {
  commentsModel.findOneAndUpdate({id:id},{content},callback)
}
const Delete = function(id,callback) {
  commentsModel.findOneByIdAndRemove({id:id},callback)
}

let commentsModel = mongoose.model('comments', commentsSchema)

module.exports.comments = commentsModel;
module.exports.selectAll = selectAll;
module.exports.selectOne = selectOne;
module.exports.update = update;
module.exports.Delete = Delete;
module.exports.save = save;