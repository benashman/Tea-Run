var express = require('express');
var app = express();
var port = 3000;
var connections = require('connections');

connections = new connections();

connections.hello();

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
	res.sendfile('index.html');
});

// Room select
app.get('/home', function(req, res) {
	res.render('home');
});

// Single room
app.get('/room/:id', function(req, res) {
	res.render('room', {
		room: req.params
	});
});

app.listen(port);
console.log('Listening on port 3000');
