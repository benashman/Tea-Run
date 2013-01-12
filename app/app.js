var express = require('express');
var app = express();
var port = 3000;
var connections = require('connections');

connections = new connections();

connections.init();

var members = [];

// App config
app.configure(function() {

	// Path to app views
	app.set('views', __dirname + '/views');

	app.set('view engine', 'jade');

	// Path to public
	app.use(express.static(__dirname + '/public'));

});

// Home
app.get('/', function(req, res) {

	// Load static index
	res.sendfile('index.html');

});

// Tea Room
app.get('/home', function(req, res) {

	console.log(connections.users);

	// Render home template
	res.render('home', {

		users: connections.users

	});

});

/*
res.render('room', {
	pageTitle: "Room Meow",
	room: req.params
});
*/

app.listen(port);

console.log('Listening on port 3000');
