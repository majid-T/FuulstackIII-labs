const http = require("http"),
  url = require("url"),
  fs = require("fs"),
  io = require("socket.io");

const mongoose = require('mongoose');

//requiring models
const Restaurant = require('./models/Restaurant');
const Order = require('./models/Order');

//Complete later
let localConnectionString = 'mongodb://localhost:27017/admin?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false';
let atlasConnectionString = 'mongodb+srv://MajidMongoUser:Mongo2146@cluster0-o3pt4.azure.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(atlasConnectionString);

//connection to mongoose
mongoose
 .connect(atlasConnectionString, { useNewUrlParser: true } )
 .then( () => { console.log("Mongoose connected successfully "); },
   error => { console.log("Mongoose could not connected to database: " + error); }
 );


const server = http.createServer(function(req, res) {
  var path = url.parse(req.url).pathname;
  switch (path) {
    case "/":
      fs.readFile(__dirname + "/index.html", function(err, data) {
        if (err) return send404(res);
        res.writeHead(200, {
          "Content-Type": path == "json.js" ? "text/javascript" : "text/html"
        });
        res.write(data, "utf8");
        res.end();
      });
      break;

    default:
      send404(res);
  }
});
const send404 = function(res) {
  res.writeHead(404);
  res.write("404");
  res.end();
};

const PORT = 8080;
server.listen(PORT, () => console.log(`server started on localhost:${PORT}`));

// socket.io, I choose you
const ioServer = io.listen(server);

// socket.io setup and manager
ioServer.on("connection", function(socket) {
  // now we have a client object!
  console.log("Connection accepted.");

  // event listeners
  // socket.on("message", function(message) {
  //   console.log(`Recieved message: ${message} - from client`);
  //   socket.emit("msgreceived");
  // });

  socket.on("disconnect", function() {
    console.log("Disconnected...");
  });

//get restaurants listener
  socket.on("get-restaurants", () => {
    console.log("server - get-restarants called");
    Restaurant.where('city').eq('Queens').where('cuisine').eq('Delicatessen').exec((err,results)=>{
      if(err){
        console.log(`ERROR: ${err}`);
      }else{
        console.log(`We found: ${results}`);
          let data = results.map(x=> {
            let restaurant = {
              name: x.name,
              cuisine: x.cuisine
            };
            return restaurant;
          });
          socket.emit('restaurants-data',JSON.stringify(data));
      }
    });
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
  });

//get orders listener
  socket.on("get-orders", () => {
    console.log("server - get-orders called");
    Order.find((err,documents)=>{
      if(err){
        console.log(`Error on getting data from db ${err}`);
      }else{
        console.log(`Order.find() returned documents: ${documents}`);
        let data = documents.map(x=> {
          let order = {
            orderId: x.orderId,
            item : x.item,
            customer_name: x.customer_name
          };
          return order;
        });
        socket.emit('order-data',JSON.stringify(data));
      }
    });
  });

  // add-order listener
  socket.on("add-order", () => {
    console.log("server - add-order called by client");
    let newOrder = new Order({
            orderId: 101,
            item : 'some food',
            customer_name: 'new customer'});
    newOrder.save()
    .then((data)=>{
      console.log('New order added');
      socket.emit('order-data-added',data);
    })
    .catch((err)=>{
      console.log(`ERROR: ${err}`);
      socket.emit('error-order-add',err);
    });
  });
});

