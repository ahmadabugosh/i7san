const mongoose = require('mongoose');
mongoose.set('debug', true);

const volunteeringSchema = new mongoose.Schema({
  name: String,
  description: String,
  activity: String,
  hours: Number,
  points: Number,
  mediaUrl: String,
   timeCreated: { type: Date, default: Date.now },
   verified: Boolean
});

const Volunteering = mongoose.model('Volunteering', volunteeringSchema);
module.exports = Volunteering;