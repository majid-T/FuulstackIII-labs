
$(function(){
	let option = {room: 'General'};
	var socket = io.connect('http://localhost:3000?room=majidRoom');

	var message = $("#message")
	var username = $("#username")
	var send_message = $("#send_message")
	var send_username = $("#send_username")
	var chatroom = $("#chatroom")
	var feedback = $("#feedback")

	//Emit message
	send_message.click( () => {
		socket.emit('newMessage', {message : message.val()})
	});

	//Listen on new_message
	socket.on("newMessage", (data) => {
		feedback.html('');
		message.val('');
		chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
	})

	//Emit a username
	send_username.click(function(){
		socket.emit('changeUsername', {username : username.val()})
	})

	//Emit typing
	message.bind("keypress", () => {
		socket.emit('userTyping')
	})

	//Listen on typing
	socket.on('userTyping', (data) => {
		feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
	})
});


