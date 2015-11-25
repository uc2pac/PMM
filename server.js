var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/client'));

app.get('/', function(req, res){
  	res.sendFile('client/index.html');
});

io.on('connection', function(socket){
  	console.log('a user connected');
});

http.listen(3000, function(){
  	console.log('listening on port: 3000');
});