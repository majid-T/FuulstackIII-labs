const mongoose = require('mongoose');

//requiring models
const Event = require('./models/Event');
const ChatHistory = require('./models/ChatHistory');


let atlasConnectionString = 'mongodb+srv://MajidMongoUser:Mongo2146@cluster0-o3pt4.azure.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(atlasConnectionString);

//connection to mongoose
mongoose
 .connect(atlasConnectionString, { useNewUrlParser: true } )
 .then( () => { console.log("Mongoose connected successfully to Mongo DB Atlas"); },
   error => { console.log("Mongoose could not connected to database: " + error); }
 );


//Functions to connect to Talk To DB

const saveEvent = (inEvent)=>{
  let tmpEvent = new Event(inEvent);
  tmpEvent.save()
    .then((data)=>{
      console.log(`Event ${inEvent.eventName} save to DB on ${new Date().toISOString()}`);
    })
    .catch((err)=>{
      console.log(`ERROR: ${err}`);
    });
};


const saveChat = (inChat)=>{
  let tmpMsg = new ChatHistory(inChat);
  tmpMsg.save()
    .then((data)=>{
      console.log(`Chat saved to DB on  ${new Date().toISOString()}`);
    })
    .catch((err)=>{
      console.log(`ERROR: ${err}`);
    });
};

const getAllEvents = ()=>{
  return new Promise((resolve,reject)=>{
      Event.find((err,documents)=>{
          if(err){
            console.log(`ERROR: ${err}`);
            reject(err);
          }else{
            let data = documents.map(x=> {
              let event = {
                eventId: x._id,
                eventName: x.eventName,
                eventDesc: x.eventDesc,
                eventDate: x.eventDate,
                eventOwner: x.eventOwner,
                socketId : x.socketId
              };
            return event;
          });
        resolve(JSON.stringify(data));
      }
    });
  });
};

const getAllChats = ()=>{
  return new Promise((resolve,reject)=>{
      ChatHistory.find((err,documents)=>{
          if(err){
            console.log(`ERROR: ${err}`);
            reject(err);
          }else{
            let data = documents.map(x=> {
              let chat = {
                chatId: x._id,
                chatUsername: x.chatUsername,
                chatMessage: x.chatMessage,
                chatRoom: x.chatRoom,
                chatDate: x.chatDate,
                socketId : x.socketId
              };
            return chat;
          });
        resolve(JSON.stringify(data));
      }
    });
  });
};

const getChatsForRoom = (room)=>{
  return new Promise((resolve,reject)=>{
      ChatHistory.where('chatRoom').eq(`${room}`).exec((err,documents)=>{
          if(err){
            console.log(`ERROR: ${err}`);
            reject(err);
          }else{
            let data = documents.map(x=> {
              let chat = {
                chatId: x._id,
                chatUsername: x.chatUsername,
                chatMessage: x.chatMessage,
                chatRoom: x.chatRoom,
                chatDate: x.chatDate,
                socketId : x.socketId
              };
            return chat;
          });
        resolve(JSON.stringify(data));
      }
    });
  });
};
  // socket.on("get-restaurants", () => {
  //   console.log("server - get-restarants called");
  //   Restaurant.where('city').eq('Queens').where('cuisine').eq('Delicatessen').exec((err,results)=>{
  //     if(err){
  //       console.log(`ERROR: ${err}`);
  //     }else{
  //       console.log(`We found: ${results}`);
  //         let data = results.map(x=> {
  //           let restaurant = {
  //             name: x.name,
  //             cuisine: x.cuisine
  //           };
  //           return restaurant;
  //         });
  //         socket.emit('restaurants-data',);
  //     }
  //   });
    // Restaurant.find((err,documents)=>{
    //   if(err){
    //     console.log(`Error on getting data from db ${err}`);
    //   }else{
    //     console.log(`Restaurant.find() returned documents: ${documents}`);
    //     let data = documents.map(x=> {
    //       let restaurant = {
    //         name: x.name,
    //         city : x.city,
    //         cuisine: x.cuisine
    //       };
    //       return restaurant;
    //     });
    //     socket.emit('restaurants-data',JSON.stringify(data));
    //   }
    // });
  // });

//get orders listener
  // socket.on("get-orders", () => {
  //   console.log("server - get-orders called");
  //   Order.find((err,documents)=>{
  //     if(err){
  //       console.log(`Error on getting data from db ${err}`);
  //     }else{
  //       console.log(`Order.find() returned documents: ${documents}`);
  //       let data = documents.map(x=> {
  //         let order = {
  //           orderId: x.orderId,
  //           item : x.item,
  //           customer_name: x.customer_name
  //         };
  //         return order;
  //       });
  //       socket.emit('order-data',JSON.stringify(data));
  //     }
  //   });
  // });

  // add-order listener
  // socket.on("add-order", () => {
  //   console.log("server - add-order called by client");
  //   let newOrder = new Order({
  //           orderId: 101,
  //           item : 'some food',
  //           customer_name: 'new customer'});
  //   newOrder.save()
  //   .then((data)=>{
  //     console.log('New order added');
  //     socket.emit('order-data-added',data);
  //   })
  //   .catch((err)=>{
  //     console.log(`ERROR: ${err}`);
  //     socket.emit('error-order-add',err);
  //   });
  // });
//});

module.exports.saveEvent = saveEvent;
module.exports.saveChat = saveChat;
module.exports.getAllEvents = getAllEvents;
module.exports.getAllChats = getAllChats;
module.exports.getChatsForRoom = getChatsForRoom;
