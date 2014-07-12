var sys = require('sys'),
	exec = require('child_process').exec;
/**
 * Module dependencies.
 */

var socket = require('socket.io')
var exphbs  = require('express3-handlebars');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

// var app = express();
var app = express();


app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));



var chat_room = socket.listen(app.listen(1111));

chat_room.sockets.on('connection', function(client){
	console.log('connection')


	// socket.on('disconnect', function() {
	// 	chat_room.sockets.emit('exit', {message: 'A chatter has disconnected'})
	// });

	// socket.on('chat', function(data){
	// 	chat_room.sockets.emit('chat', {message: '# ' + data.message});
	// })

	chat_room.sockets.emit('entrance', {message: 'A new chatter is online.'});
});

var isRequesting = false;

app.get('/', routes.index);

app.get('/track', function(req, res){



	var cmd = "osascript ./playing-track.scpt ";

	exec(cmd, function(err, stdout, stderr) {
		isRequesting = true;

		var obj = {};
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



	var cmd ;

	var command = req.params.command;
	if(command == "play"){
		var link = req.query.link
		cmd= "osascript ./spotify.scpt " + command +" "+ link;
	}else{

		cmd= "osascript ./spotify.scpt " + command;
	}
	// var cmd = "osascript spotify.scpt";


	exec(cmd, function(err, stdout, stderr) {
		isRequesting = true;
		// setTimeout(function(){
	 //  		isRequesting = false;
  //   	}, 500);
		if (stdout) console.log(stdout);
		if(stderr) console.log(stderr);


		res.send(200);
	});



});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
