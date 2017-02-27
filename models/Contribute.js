const mongoose = require('mongoose');
mongoose.set('debug', true);

const contributeSchema = new mongoose.Schema({
  name: String
});

const Contribute = mongoose.model('Contribute', contributeSchema);
module.exports = Contribute;