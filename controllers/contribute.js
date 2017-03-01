/**
 * GET /contribute
 * List all contributions.
 */
const Contribute = require('../models/Contribute.js');

exports.getContributions = (req, res) => {
  Contribute.find((err, docs) => {
 res.render('contributions', { 'contributions': docs });
  });
};


exports.addContributions = (req, res) => {
  Contribute.find((err, docs) => {
 res.render('add', { 'contributions': docs });
  });
};

exports.createContributions = (req, res) => {
 console.log("We here");
};