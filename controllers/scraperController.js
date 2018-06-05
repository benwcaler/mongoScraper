var db = require("../models");
let cheerio = require("cheerio");
let request = require("request");
let mongoose = require("mongoose");
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

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
        result.link = $(element).children("h2").children("a").attr("href");
        result.synopsis = $(element).children("h5").text();

        db.Article.create(result).then(function (err, article) {
        }).catch(function (err) {
          console.log(err)
        });

      });
    });

    db.Article.find().sort({'createdAt': -1}).then(function (resp) {
      res.render("index", { stories: resp })
    });
  });

}