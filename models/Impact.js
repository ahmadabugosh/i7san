const mongoose = require('mongoose');
mongoose.set('debug', true);

const impactSchema = new mongoose.Schema({
  category: String,
  metric: String,
  amount: Number

});

const Impact = mongoose.model('Impact', impactSchema);
module.exports = Impact;