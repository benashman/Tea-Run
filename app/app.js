var express = require('express');
var app = express();
var port = 3000;
var connections = require('connections');

connections = new connections();

connections.init();

app.configure(function() {

	app.use(express.static(__dirname + '/public'));

});

app.get('/', function(req, res) {
	res.sendfile("index.html");
});

// Start server
app.listen(port);
console.log('Listening on port 3000');