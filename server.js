var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/client'));

app.all('/*', function(req, res){
  	res.sendFile('index.html', { root: __dirname + '/client' });
});

io.on('connection', function(socket){
  	console.log('a user connected');
});

http.listen(3000, function(){
  	console.log('listening on port: 3000');
});