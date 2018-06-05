var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    required: true,
    unique: true
  },
  synopsis: {
    type: String,
    required: true,
    unique: true
  },
  notes: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
}, {
    timestamps: true
  });

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
