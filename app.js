var app = require('express')();
var fs = require('fs');
var _ = require('underscore');
var config = require('./config.json');
console.log(config);
var Linkedin = require('node-linkedin')(config.linkedin.api, config.linkedin.secret, config.application.server + ':' + config.application.port + '/oauth/linkedin/callback');

var linkedin_file = config.linkedin.cache_file;
var linkedin_export_file = config.application.export_folder + "/linkedin.json";

app.get('/oauth/linkedin', function(req, res) {
    // This will ask for permisssions etc and redirect to callback url.
    Linkedin.auth.authorize(res, ['r_basicprofile']);
});

app.get('/oauth/linkedin/callback', function(req, res) {
	Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, function(err, results) {
		if ( err ) {
			return console.error(err);
		}

		/**
		* Results have something like:
		* {"expires_in":5184000,"access_token":". . . ."}
		*/
		console.log(results);
		var resultsString = JSON.stringify(results);
		fs.writeFile(linkedin_file, resultsString, function(err) {
			if (err) {
				console.log(err);
			} else {
				console.log("JSON saved to " + linkedin_file);
			}
		});
		return res.redirect('/export');
	});
});

app.get('/export', function(req, res) {
	var response = {};
	linkedin = getLinkedinClient();
	linkedin.people.me(['id', 'first-name', 'last-name', 'maiden-name',
            'formatted-name', 'headline', 'location',
            'industry', 'num-connections', 'num-connections-capped',
            'summary', 'specialties', 'positions', 'picture-url','picture-urls::(original)',
            'email-address', 'last-modified-timestamp', 'associations', 'interests',
            'publications', 'patents', 'languages', 'skills', 'certifications',
            'educations', 'courses', 'volunteer', 'num-recommenders',
            'recommendations-received', 'mfeed-rss-url', 'following', 'job-bookmarks',
            'suggestions', 'date-of-birth', 'related-profile-views', 'honors-awards',
            'phone-numbers', 'bound-account-types', 'im-accounts', 'main-address',
            'twitter-accounts', 'primary-twitter-account', 'connections', 'group-memberships',
            'network', 'public-profile-url'],function(err, $in) {
		storeLinkedinInfo($in);
		res.send('');

	});
});

app.get('/test', function(req, res) {
	var response = {};
	linkedin = getLinkedinClient();
	linkedin.people.me(['skills','headline'],function(err, $in) {
		res.send($in);

	});
});

function getLinkedinClient() {
	var configs = JSON.parse(fs.readFileSync(linkedin_file, encoding="ascii"));
	var linkedin = Linkedin.init(configs.access_token);
	return linkedin;
}

function storeLinkedinInfo(data) {
	fs.writeFile(linkedin_export_file, JSON.stringify(data, null, 4), function(err) {
		if(err) {
		  console.log(err);
		} else {
		  console.log("JSON saved to " + linkedin_export_file);
		}
	});
}
app.listen(config.application.port);
console.log("listening on " + config.application.server + ':' + config.application.port);
