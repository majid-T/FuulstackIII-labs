$(function(){
	const logsContainer = $('#logsContainer');
	const tableContent = $('#tableContent');
	let currentView = '';
    let socket = io.connect('http://localhost:3000');

    //loading all events by default
	socket.emit('getAllEvents');
	$('#getAllEvents').hide();
	currentView = 'getAllEvents';


    // get specific room
    $(".logLink").click((e)=>{
    	tableContent.children('tr').remove();
	   	socket.emit('getChatsForRoom',{room:e.target.id});
    });

    //get all messages
    $('#getAllChats').click(()=>{
    	socket.emit('getAllChats');
    	tableContent.empty();
    });

    //get all events
    $('#getAllEvents').click(()=>{
    	socket.emit('getAllEvents');
    	tableContent.empty();
    });

    //listeners for events
    //for all chats
	socket.on('allChats',(data)=>{
		let jsonData = JSON.parse(data);
		let counter = 1;
		for(item of jsonData){
			let st1 = `<tr><th scope="row">${counter++}</th><td>${item.chatUsername}</td>
			<td>${item.chatMessage}</td><td>${item.chatRoom}</td><td>${item.chatDate}</td>
			<td>${item.chatId}</td><td>${item.socketId}</td></tr>`;
			tableContent.append(st1);
		}

		$(`#${currentView}`).show();
		$('#getAllChats').hide();
		currentView = 'getAllChats';
	});

	//for all events
	socket.on('allEvents',(data)=>{
		let jsonData = JSON.parse(data);
		let counter = 1;
		for(item of jsonData){
			let st1 = `<tr><th scope="row">${counter++}</th><td>${item.eventName}</td>
			<td>${item.eventOwner}</td><td>${item.eventDesc}</td><td>${item.eventDate}</td>
			<td>${item.eventId}</td><td>${item.socketId}</td></tr>`;
			tableContent.append(st1);
		}

		$(`#${currentView}`).show();
		$('#getAllEvents').hide();
		currentView = 'getAllEvents';
	});
});
