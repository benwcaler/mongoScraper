var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  author: {
    type: String,
  },
  comment: {
    type: String,
    required: true
  }
}, {
    timestamps: true
  });

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
