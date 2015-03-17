//
// # SimpleServer
//
//
var http = require('http');
var path = require('path');

var express = require('express');

//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'client')));

var bodyParser = require('body-parser');
router.use(bodyParser());

var mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.IP + '/codrive', function (error) {
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
    from: String,
    to: String,
    role: String,
    start: String
});

var UserSchema = new Schema({
    user: String,
    first_name: String,
    last_name: String,
    email: String,
    phone: String
});

// Mongoose Model definition
var Trip = mongoose.model('trips', TripSchema);
var User = mongoose.model('users', UserSchema);

router.get('/tripdb', function (req, res) {
    Trip.find({}, function (err, docs) {
        console.log(docs + " - > docs");
        res.json(docs);
    });
});

router.get('/userdb', function (req, res) {
    User.find({}, function (err, docs) {
        console.log(docs + " - > docs");
        res.json(docs);
    });
});

router.post('/adduser', function(req, res, next) {
     var newUser = new User({
        user:req.body.user,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        phone:req.body.phone
    })
    newUser.save(function (err, newUser) {
    if (err) { return next(err) }
        res.json(201, newUser)
    });
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});
  