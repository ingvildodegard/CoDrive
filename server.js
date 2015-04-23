//
// # SimpleServer
//
//
var http = require('http');
var path = require('path');

var express = require('express');
var mongo = require('mongoskin');

var trip = require('./server/routes/trip.js');
var user = require('./server/routes/user.js');
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'client')));

var bodyParser = require('body-parser');
router.use(bodyParser());

var mongodb = mongo.db('mongodb://' + process.env.IP + '/codrive', {native_parser:true});

router.use(function(req,res,next){
    req.db = mongodb;
    next();
});

router.use('/trip', trip);
router.use('/user', user);

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});
  