const Impact = require('../models/Impact.js');
const Contribute = require('../models/Contribute.js');
const async = require('async');
const impacts1 ={};

exports.getImpacts = (req, res) => {

async.series([
    function(callback){
        Impact.find().exec(callback);
    },
],function(err, results){
    res.render('impacts',{
        'impacts': results
    });
});



  // Impact.find((err, docs) => {

  // res.render('impacts', { 'impacts': docs });
  // });
};