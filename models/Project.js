const mongoose = require('mongoose');
mongoose.set('debug', true);

const ProjectSchema = new mongoose.Schema({
  name: String,
  description: String,
  picture: String,
  startDate: Date,
  endDate: Date,
  category: String,
  country: String,
  city: String,
  address: String
  timeCreated: { type: Date, default: Date.now },
  username: String,
 email: {type:String, required:true}
});

const Contribute = mongoose.model('Contribute', contributeSchema);
module.exports = Contribute;