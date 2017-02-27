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