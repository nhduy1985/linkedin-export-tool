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
    Linkedin.auth.authorize(res, ['r_basicprofile', 'r_fullprofile', 'r_emailaddress', 'r_network', 'r_contactinfo', 'rw_nus', 'rw_groups', 'w_messages']);
});

app.get('/oauth/linkedin/callback', function(req, res) {
    Linkedin.auth.getAccessToken(res, req.query.code, function(err, results) {
        if ( err )
            return console.error(err);

        /**
         * Results have something like:
         * {"expires_in":5184000,"access_token":". . . ."}
         */
		fs.writeFile(linkedin_file, results, function(err) {
			if(err) {
			  console.log(err);
			} else {
			  console.log("JSON saved to " + linkedin_file);
			}
		}); 
        console.log(results);
        return res.redirect('/');
    });
});

app.get('/export', function(req, res) {
	var response = {};
	linkedin = getLinkedinClient();	
	linkedin.people.me(['id', 'first-name', 'last-name','public-profile-url','picture-url','positions','projects','skills'],function(err, $in) {		
		storeLinkedinInfo($in);
		res.send('');
		
	});
});

app.get('/test', function(req, res) {
	var response = {};
	linkedin = getLinkedinClient();	
	linkedin.people.me(['skills','endorsements'],function(err, $in) {		
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