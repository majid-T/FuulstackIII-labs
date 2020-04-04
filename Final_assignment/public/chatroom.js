
$(function(){
    let searchParams = new URLSearchParams(window.location.search);
    let nickname = searchParams.get('nickname');
    let avatar = searchParams.get('avatar');
    let userAvatarImg = $('#userAvatar');

    userAvatarImg.attr("src", `media/${avatar}.png`);
    userAvatarImg.attr("alt", 'Logo by https://logomakr.com/s');

    let title = document.createElement('h2')
    title.innerHTML = nickname;
    userAvatarImg.after(title);


//Chatroom ------------
    let socket = io.connect('http://localhost:3000');
    socket.emit('changeUsername', {username :nickname,avatar:avatar});

    let message = $("#message")
    let username = $("#username")
    let send_message = $("#send_message")
    let send_username = $("#send_username")
    let chatroom = $("#chatroom")
    let feedback = $("#feedback")

    //Emit message
    send_message.click( () => {
        socket.emit('newMessage', {message : message.val(),userAvatar:avatar})
    });

    //Listen on new_message
    socket.on("newMessage", (data) => {
        feedback.html('');
        message.val('');
        chatroom.append(`<img class="message-img" src="media/${data.avatar}.png" alt="Logo by https://logomakr.com/"/>`);
        chatroom.append(`<p class="message"><b>${data.username}</b>:  ${data.message} </p>`);
    })

    //Emit a username
    send_username.click(function(){
        socket.emit('changeUsername', {username : username.val()})
    })

    //Emit typing
    message.bind("keypress", () => {
        socket.emit('userTyping');
    })

    //Listen on typing
    socket.on('userTyping', (data) => {
        feedback.html(`<p><i>${data.username} is typing a message...</i></p>`);
    })
});


