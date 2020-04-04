const express = require('express');
const app = express();

let msgs = [];

app.set('view engine', 'ejs');

app.use(express.static('public'));


app.get('/', (req, res) => {
	res.render('index')
});

app.get('/chatroom', (req, res) => {
    res.render('chatroom')
});

app.get('/page2', (req, res) => {
    res.render('page2')
});

server = app.listen(3000);

const io = require("socket.io")(server);


io.on('connection', (socket) => {

	console.log('New user in Chat room...');

    socket.on('changeUsername', (data) => {
        let nickname = data.username;
        let userAvatar = data.avatar;
        socket.username = nickname;
        io.sockets.emit('newMessage', {message : `${nickname} joined on ${new Date()}`, username : 'SERVER',avatar:'server'});

        socket.emit('newMessage',{message : `Hi ${nickname} `, username : 'SERVER',avatar:'server'});

        if(msgs.length <10){
            lastMsg = msgs.length;
        }else{
            lastMsg = 10;
        }

        for (var i =0;i<lastMsg;i++){
            socket.emit('newMessage',msgs[i]);
        }

    })

    //listen on new_message
    socket.on('newMessage', (data) => {
        //broadcast the new message
        msgs.push({message : data.message, username : socket.username});
        io.sockets.emit('newMessage', {message : data.message, username : socket.username,avatar:data.userAvatar});
        console.log(msgs);
    })

    //listen on typing
    socket.on('userTyping', (data) => {
    	socket.broadcast.emit('userTyping', {username : socket.username});
    })
})
