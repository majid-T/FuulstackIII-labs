const express = require('express');
const app = express();
const dbDao = require('./dao');

let msgs = [];
let publicRoom = [];

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

	console.log(`-*-*-*-\nEVENT: New User connected\nSocket Id:\t\t${socket.id}\nDate:\t\t${new Date().toISOString()}\n-------`);
    // dbDao.saveEvent({
    //     eventName:'Socket-Connect',
    //     eventDesc:'New Socket Connected',
    //     eventDate:new Date().toISOString(),
    //     eventOwner: 'Server',
    //     socketId : socket.id
    // });

    socket.on('changeUsername', (data) => {
        let userAvatar = data.avatar;
        socket.username = data.username;

        console.log(`-*-*-*-\nEVENT: User name ${socket.username} defined for\nSocket Id:\t\t${socket.id}\nDate:\t\t${new Date().toISOString()}\n-------`);
        // dbDao.saveEvent({
        //     eventName:'Username-defined',
        //     eventDesc:`${socket.id} defined username ${nickname} for himself`,
        //     eventDate:new Date().toISOString(),
        //     eventOwner: `${nickname}`,
        //     socketId : socket.id
        // });

        io.sockets.emit('newMessage', {message : `${socket.username} joined on ${new Date().toISOString()}`, username : 'SERVER',avatar:'server'});
        io.sockets.emit('newUser', {username : `${socket.username}` ,avatar: userAvatar});

        socket.emit('newMessage',{message : `Hi ${socket.username} `, username : 'SERVER',avatar:'server'});

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
        msgs.push({message : data.message, username : socket.username,avatar:data.userAvatar});

        dbDao.saveChat({
            chatUsername:`${socket.username}`,
            chatMessage:`${data.message}`,
            chatRoom: 'Public',
            chatDate: new Date().toISOString(),
            socketId : socket.id
        });

        //broadcast the new message
        io.sockets.emit('newMessage', {message : data.message, username : socket.username,avatar:data.userAvatar});
        console.log(msgs);
    })

    //listen on typing
    socket.on('userTyping', (data) => {
    	socket.broadcast.emit('userTyping', {username : socket.username});
    })

    socket.on('disconnect', (data) => {
        console.log(`-*-*-*-\nEVENT: ${socket.username} disconnected\nSocket Id:\t\t${socket.id}\nDate:\t\t${new Date().toISOString()}\n-------`);
        // dbDao.saveEvent({
        //     eventName:'User-Disconnect',
        //     eventDesc:`User ${socket.username} disconnected`,
        //     eventDate:new Date().toISOString(),
        //     eventOwner: `${socket.username}`,
        //     socketId : socket.id
        // });
        io.sockets.emit('newMessage', {message : `${socket.username} left the room on ${new Date().toISOString()}`, username : 'SERVER',avatar:'server'});

    })
})
