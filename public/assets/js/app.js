let cheerio = require("cheerio");
let request = require("request");

// First, tell the console what server2.js is doing
console.log("\n******************************************\n" +
  "Grabbing every article headline, link\n" +
  " and synopsis from the KSL.com:" +
  "\n******************************************\n");

// Making a request for `nhl.com`'s homepage
request("https://www.ksl.com/", function (error, response, html) {

  // Load the body of the HTML into cheerio
  let $ = cheerio.load(html);

  // Empty array to save our scraped data
  let results = [];

  // With cheerio, find each h4-tag with the class "headline-link" and loop through the results
  $("div.headline").each(function (i, element) {

    // Save the text of the h4-tag as "title"
    let title = $(element).children("h2").text();

    // Find the h4 tag's parent a-tag, and save it's href value as "link"
    let link = $(element).children("h2").children("a").attr("href");

    let synopsis = $(element).children("h5").text();

    // Make an object with data we scraped for this h4 and push it to the results array
    results.push({
      title: title.replace('\n', ' ').trim(),
      link: `http://www.ksl.com/${link}`,
      synopsis: synopsis
    });
  });

  // After looping through each h4.headline-link, log the results
  console.log(results);
});
