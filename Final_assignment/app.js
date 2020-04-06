const express = require('express');
const app = express();
const dbDao = require('./dao');

let Rooms = {
    Mars : [],
    Jupiter : [],
    Saturn : [],
    Sun : [],
    Earth : []
};


app.set('view engine', 'ejs');

app.use(express.static('public'));


//routing parts
app.get('/', (req, res) => {
	res.render('index');
});

app.get('/chatroom', (req, res) => {
    res.render('chatroom');
});

app.get('/logs', (req, res) => {
    res.render('logs');
});

server = app.listen(3000);

const io = require("socket.io")(server);

io.on('connection', (socket) => {

	console.log(`-*-*-*-\nEVENT: New User connected\nSocket Id:\t\t${socket.id}\nDate:\t\t${new Date().toISOString()}\n-------`);
    dbDao.saveEvent({
        eventName:'Socket-Connect',
        eventDesc:'New Socket Connected',
        eventDate:new Date().toISOString(),
        eventOwner: 'Server',
        socketId : socket.id
    });

    socket.on('changeUsername', (data) => {
        let userAvatar = data.avatar;
        socket.avatar = data.avatar;
        socket.username = data.username;
        socket.joinedRoom ='Earth';
        socket.join('Earth');

        //show users -----
        Rooms['Earth'].push({username:socket.username,avatar:socket.avatar});
        //end of show users

        console.log(`-*-*-*-\nEVENT: User name ${socket.username} defined for\nSocket Id:\t\t${socket.id}\nDate:\t\t${new Date().toISOString()}\n-------`);
        dbDao.saveEvent({
            eventName:'Username-defined',
            eventDesc:`${socket.id} defined username ${nickname} for himself`,
            eventDate:new Date().toISOString(),
            eventOwner: `${nickname}`,
            socketId : socket.id
        });

        io.sockets.to(`${socket.joinedRoom}`).emit('roomUsers',Rooms[socket.joinedRoom]);

        io.sockets.to(`${socket.joinedRoom}`).emit('newMessage', {message : `${socket.username} joined ${socket.joinedRoom} on ${new Date().toISOString()}`, username : 'SERVER',avatar:'server'});
        // io.sockets.to('roomPublic').emit('newUser', {username : `${socket.username}` ,avatar: userAvatar});

        socket.emit('newMessage',{message : `Hi ${socket.username},Welcome to planet ${socket.joinedRoom} `, username : 'SERVER',avatar:'server'});

    })

    //listen on new_message
    socket.on('newMessage', (data) => {
        console.log(data.message);
        dbDao.saveChat({
            chatUsername:`${socket.username}`,
            chatMessage:`${data.message}`,
            chatRoom: socket.joinedRoom,
            chatDate: new Date().toISOString(),
            socketId : socket.id
        });

        //broadcast the new message
        io.sockets.to(`${socket.joinedRoom}`).emit('newMessage', {message : data.message, username : socket.username,avatar:data.userAvatar});
        // console.log(msgs);
    })

    //listen on typing
    socket.on('userTyping', (data) => {
    	socket.to(`${socket.joinedRoom}`).broadcast.emit('userTyping', {username : socket.username});
    });

    socket.on('disconnect', (data) => {
        console.log(`-*-*-*-\nEVENT: ${socket.username} disconnected\nSocket Id:\t\t${socket.id}\nDate:\t\t${new Date().toISOString()}\n-------`);
        dbDao.saveEvent({
            eventName:'User-Disconnect',
            eventDesc:`User ${socket.username} disconnected`,
            eventDate:new Date().toISOString(),
            eventOwner: `${socket.username}`,
            socketId : socket.id
        });
        io.sockets.to(`${socket.joinedRoom}`).emit('newMessage', {message : `${socket.username} left the room on ${new Date().toISOString()}`, username : 'SERVER',avatar:'server'});
        //Remove people from list and emit to all here....
        Rooms[socket.joinedRoom] = Rooms[socket.joinedRoom].filter(x => x.username!==socket.username);
        io.sockets.to(`${socket.joinedRoom}`).emit('roomUsers',Rooms[socket.joinedRoom]);

    });

    socket.on('changeRoom',(data)=>{
        console.log(`-*-*-*-\nEVENT: ${socket.username} changed room to ${data.newRoom}\nSocket Id:\t\t${socket.id}\nDate:\t\t${new Date().toISOString()}\n-------`);
        io.sockets.to(`${socket.joinedRoom}`).emit('newMessage', {message : `${socket.username} left the room for ${socket.joinedRoom} on ${new Date().toISOString()}`, username : 'SERVER',avatar:'server'});
        let prevRoom = socket.joinedRoom;
        socket.joinedRoom = data.newRoom;
        socket.join(data.newRoom);
        socket.emit('newMessage',{message : `Hi ${socket.username},Welcome to ${socket.joinedRoom} planet `, username : 'SERVER',avatar:'server'});


        //show users -----
        Rooms[prevRoom] = Rooms[prevRoom].filter(x => x.username!==socket.username);
        Rooms[data.newRoom].push({username:socket.username,avatar:socket.avatar});
        // console.log(Rooms);
        io.sockets.to(`${prevRoom}`).emit('roomUsers',Rooms[prevRoom]);
        io.sockets.to(`${socket.joinedRoom}`).emit('roomUsers',Rooms[socket.joinedRoom]);

        // end of show users-------

        dbDao.saveEvent({
            eventName:'User Changed Room',
            eventDesc:`User ${socket.username} changed room from ${prevRoom} to ${socket.joinedRoom}`,
            eventDate:new Date().toISOString(),
            eventOwner: `${socket.username}`,
            socketId : socket.id
        });
    });
})
