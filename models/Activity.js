const mongoose = require('mongoose');
mongoose.set('debug', true);

const activitySchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String, 
  mediaUrl: String,
   timeCreated: { type: Date, default: Date.now }
});

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;