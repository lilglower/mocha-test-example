var assert = require('assert'),
	request = require('request'),
	cheerio = require('cheerio')

describe("Google News HTML function", function(){
	this.timeout(7000)
	it('lambda function should respond with an HTML Webpage of the latest news', function(){
		return new Promise(function(resolve, reject) {
			request('https://pelj4u1684.execute-api.us-west-2.amazonaws.com/prod/googleNews', (err, res, buffer) => {
				if(err)
					throw new Error(err.toString());

				if(res.statusCode != 200)
					throw new Error(`Response Status Code is ${res.statusCode}`)

				var $ = cheerio.load(buffer),
					storiesFound = 0;

				$('.newsStory').each(function(){
					storiesFound++;
				})

				if(!storiesFound)
					throw new Error("No News Stories were found on the page!");

				resolve();
		    });
			
		} );
	})
})