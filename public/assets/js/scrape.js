let cheerio = require("cheerio");
let request = require("request");

request("https://www.ksl.com/", function (error, response, html) {
  let $ = cheerio.load(html);
  let results = [];

  $("div.headline").each(function (i, element) {
    let title = $(element).children("h2").text();
    let link = $(element).children("h2").children("a").attr("href");
    let synopsis = $(element).children("h5").text();

    results.push({
      title: title.replace('\n','').trim(),
      link: `http://www.ksl.com/${link}`,
      synopsis: synopsis
    });
  });
  console.log(results);
});
