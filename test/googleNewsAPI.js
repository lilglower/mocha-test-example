var assert = require('assert'),
	request = require('request')

describe("Google News JSON API", function(){
	this.timeout(7000)
	it('should complete the request and return valid JSON', function(){
		return new Promise(function(resolve, reject) {
			request('https://pelj4u1684.execute-api.us-west-2.amazonaws.com/prod/googleNewsAPI', (err, res, buffer) => {
				if(err)
					throw new Error(err.toString());

				if(res.statusCode != 200)
					throw new Error(`Response Status Code is ${res.statusCode}`)

				try{
					var response = JSON.parse(buffer);
				} catch(e){
					throw new Error("The lambda function did not return valid JSON.")
				}
				// if('message' in response && response.message == 'Internal server error')
				// 	return assert.fail("Results", response.message, "AWS Lambda Returned a Server Error.");

				assert.ok(`OK, ${response.results.length} News Stories Fetched.`);
				resolve();
		    });
			
		} );
	})
})