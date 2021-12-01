var express = require('express');
var app = express();
var server = app.listen(3000);

app.use(express.static('docs'));

//create a websocket to detect new connections to the server
/*
//Load the socket.io library
var socket = require('socket.io');

//link the library to the Express server
var io = socket(server);
// Listen for "connection" and call the newConnection function
io.sockets.on('connection', newConnection);


function newConnection(socket)
{
    //Print socket id
    console.log('New Connection: ' + socket.id);
    
    // listen for "text" connection and call MessageReceivedd function
    socket.on('text', MessageReceived);

    function MessageReceived(data)
    {
        //sent a broadcast to all connected session but the sending session
        socket.broadcast.emit('text', data);
    }
}
*/