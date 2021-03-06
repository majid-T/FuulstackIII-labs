const express = require('express');
const app = express();

let msgs = [];

app.set('view engine', 'ejs');

app.use(express.static('public'));


app.get('/', (req, res) => {
	res.render('index')
});

server = app.listen(3000);


const io = require("socket.io")(server);


io.on('connection', (socket) => {
	console.log('New user in Chat room...');
    console.log(msgs);
    io.sockets.emit('newMessage', {message : `new user joined on ${new Date()}`, username : 'SERVER'});

    socket.emit('newMessage',{message : 'Hi new user ', username : 'SERVER'});

    if(msgs.length <10){
        lastMsg = msgs.length;
    }else{
        lastMsg = 10;
    }

    for (var i =0;i<lastMsg;i++){
        socket.emit('newMessage',msgs[i]);
    }

	socket.username = "Anonymous";

    socket.on('changeUsername', (data) => {
        socket.username = data.username;
    })

    //listen on new_message
    socket.on('newMessage', (data) => {
        //broadcast the new message
        msgs.push({message : data.message, username : socket.username});
        io.sockets.emit('newMessage', {message : data.message, username : socket.username});
        console.log(msgs);
    })

    //listen on typing
    socket.on('userTyping', (data) => {
    	socket.broadcast.emit('userTyping', {username : socket.username});
    })
})
