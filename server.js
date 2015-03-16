//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');

var async = require('async');
var express = require('express');

//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'client')));

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
    Trip.find({}, function (err, docs) {
        console.log(docs + " - > docs");
        res.json(docs);
    });
});


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
  