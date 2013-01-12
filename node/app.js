var express = require('express');
var app = express();
var _connections = require('connections');
var connections = new _connections();

connections.hello();

app.get('/hello', function(req, res) {
});

app.listen(3000);
console.log('Listening on port 3000');