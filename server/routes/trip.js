var express = require('express');
var router = express.Router();

router.get('/deletetrip/:id', function(req, res) {
    var db = req.db;
    console.log(req.params);
    var tripToDelete = req.params.id;
    db.collection('trip').removeById(tripToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

router.get('/all', function (req, res) {
    var db = req.db;
    console.log("get/all");
    db.collection('trip').find().toArray(function(err, result){
       res.json(result);
    });
});

router.post('/addtrip', function(req, res, next) {
   var db = req.db;
   console.log("addtrip");
    db.collection('trip').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

module.exports = router;
