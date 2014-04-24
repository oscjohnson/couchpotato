var sys = require('sys'),
	exec = require('child_process').exec;
/**
 * Module dependencies.
 */


var exphbs  = require('express3-handlebars');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

//app.configure(function(){
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
//	app.set('views', __dirname+'/views');

//});

// all environments
app.set('port', process.env.PORT || 3000);

//tell application "Spotify" to playpause
	// using terms from application "Spotify"

app.use(express.static(path.join(__dirname, 'public')));

// development only
var isRequesting = false;

app.get('/', routes.index);

app.get('/track', function(req, res){
	var obj = {};


	var cmd = "osascript ./playing-track.scpt ";

	exec(cmd, function(err, stdout, stderr) {
		isRequesting = true;

		if (stdout){
			stdout =stdout.trim('\n')
			stdout =stdout.split(":");
			obj.track = stdout[0];
			obj.artist = stdout[1];
			obj.status = stdout[2];
			console.log(stdout);
			
		}	
		if(stderr) console.log(stderr);


		// res.send(200);
		res.json(obj);
	});


});
app.get('/command/:command', function(req, res){

	// console.log(req);
	// if (isRequesting) {
	// 	res.send(404);
	// };

	var command = req.params.command;

	// var cmd = "osascript spotify.scpt";


	var cmd = "osascript ./spotify.scpt " + command;

	exec(cmd, function(err, stdout, stderr) {
		isRequesting = true;
		// setTimeout(function(){
	 //  		isRequesting = false;
  //   	}, 500);
		if (stdout) console.log(stdout);
		if(stderr) console.log(stderr);


		res.send(200);
	});

	



	//

});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
