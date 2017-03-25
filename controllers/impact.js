const Impact = require('../models/Impact.js');

const async = require('async');
const impacts1 ={};

exports.getImpacts = (req, res) => {

async.series([
    function(callback){
        Impact.find().exec(callback);
    },
],function(err, results){
    res.render('impacts',{
        'impacts': results, title:'Impact'
    });
});



  // Impact.find((err, docs) => {

  // res.render('impacts', { 'impacts': docs });
  // });
};