var cheerio = require("cheerio"); /*  install with npm install cheerio */
var request = require("request"); /*  install with npm install request */
 


module.exports = {
	name: 'img',
	description: 'Send an image on the channel related to your keywords !',
	execute(message) {
		var search = message.content.split(" ").slice(1).join(" ");

		    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + search,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };
    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }
 
 
        $ = cheerio.load(responseBody); 
 
        var links = $(".image a.link");
 
     
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));

        if (!urls.length) {
            return;
        }
 
        message.channel.send( urls[~~(Math.random()*5)] );
    });
 
 },
};
