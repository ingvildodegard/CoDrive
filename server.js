//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'client')));
var messages = [];
var sockets = [];

var mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.IP + '/trips', function (error) {
    if (error) {
        console.log(error);
    }else{
      console.log("Database connected");
    }
});

// Mongoose Schema definition
var Schema = mongoose.Schema;
var TripSchema = new Schema({
    user: String,
    first_name: String,
    last_name: String,
    destination: String,
    price: String
});

// Mongoose Model definition
var Trip = mongoose.model('trips', TripSchema);

router.get('/db', function (req, res) {
    res.send("<a href='/trips'>Show Trips as JSON objects</a>");
});

router.get('/trips', function (req, res) {
    Trip.find({}, function (err, docs) {
        console.log(docs + " - > docs");
        res.json(docs);
    });
});



io.on('connection', function (socket) {
  
  Trip.find({}, function (err, docs) {
   //     res.json(docs);
        docs.forEach(function (doc) {
          socket.emit('trip', doc);
          console.log(doc.first_name);
        });
    });
    
    
    messages.forEach(function (data) {
      socket.emit('message', data);
      console.log(data + " --> Data");
    });

    sockets.push(socket);

    socket.on('disconnect', function () {
      sockets.splice(sockets.indexOf(socket), 1);
     // updateRoster();
    });

    socket.on('trip', function (trip) {
      var text = String(trip || '');
      console.log(text + " --> text");
      if (!text)
        return;

      socket.get('name', function (err, name) {
        var data = {
          name: name,
          text: text
        };

        broadcast('message', data);
        messages.push(data);
      });
    });

    socket.on('identify', function (name) {
      socket.set('name', String(name || 'Anonym'), function (err) {
        updateRoster();
      });
    });
  });

function updateRoster() {
  async.map(
    sockets,
    function (socket, callback) {
      socket.get('name', callback);
    },
    function (err, names) {
      broadcast('roster', names);
    }
  );
}

function broadcast(event, data) {
  sockets.forEach(function (socket) {
    socket.emit(event, data);
  });
}

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
  