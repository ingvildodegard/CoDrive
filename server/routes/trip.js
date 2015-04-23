var express = require('express');
var router = express.Router();

router.get('/all', function (req, res) {
    
    var db = req.db;
    db.collection('trip').find().toArray(function(err, result){
       res.json(result);
    });
});

router.post('/addtrip', function(req, res, next) {
   var db = req.db;
    db.collection('trip').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

module.exports = router;
