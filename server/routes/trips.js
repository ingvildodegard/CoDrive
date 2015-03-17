var express = require('express');
var router = express.Router();

router.get('/all', function (req, res) {
    
    var db = req.db;
    db.collection('trips').find().toArray(function(err, result){
       res.json(result);
    });
});

router.post('/addtrips', function(req, res, next) {
   var db = req.db;
    db.collection('trips').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

module.exports = router;
