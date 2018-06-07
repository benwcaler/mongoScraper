let db = require("../models");
let cheerio = require("cheerio");
let request = require("request");
let mongoose = require("mongoose");
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

module.exports = function (app) {

  app.get("/", function (req, res) {

    request("https://www.ksl.com/", function (error, response, html) {
      let $ = cheerio.load(html);
      let result = {};
      $("div.headline").each(function (i, element) {
        result.title = $(element).children("h2").text().replace('\n', '').trim();
        result.link = `http://www.ksl.com/${$(element).children("h2").children("a").attr("href")}`;
        result.synopsis = $(element).children("h5").text();

        db.Article.create(result).then(function (err, article) {
        }).catch(function (err) {
          console.log(err)
        });
      });
    });
//need a timeout or somethign to keep this from loading before the db is populated. 
    db.Article.find().sort({'createdAt': -1}).populate("comments").then(function (resp) {
      setTimeout(1000,
      res.render("index", { stories: resp }));
    });
  });

  app.post("/newcomment", function (req,res) {
    console.log(req.body)
    let comment = {
      author: req.body.author,
      comment: req.body.comment
    };
    db.Comment.create(comment).then(function (cmnt) {
      return db.Article.findOneAndUpdate({_id: req.body.id}, {$push: {comments: cmnt._id}},{new: true});
    }).catch(function (err) {
      console.log(err)
    });
    res.redirect("/");
  });

  app.delete("/del", function(req,res) {
    console.log("anything")
    let commentid = req.body.commentid;
    let articleid = req.body.articleid;
    console.log(commentid);
    db.Comment.findByIdAndRemove(commentid, (err,result)=>{
      console.log(result);
    });
    // db.Comment.delete({_id: commentid}).then(function(data) {

    // }).catch(function(err) {
    //   console.log(err)
    // });
    // // db.Article.update({_id: articleid}, {'$pull': {"comments": commentid}}).then(function(res) {
    // // }).catch(function(err) {
    // //   console.log(err)
    // // });
    res.redirect('/');
  })

}