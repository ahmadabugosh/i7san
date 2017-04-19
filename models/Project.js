const mongoose = require('mongoose');
mongoose.set('debug', true);

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  picture: String,
  startDate: Date,
  endDate: Date,
  category: String,
  country: String,
  city: String,
  address: String,
  timeCreated: { type: Date, default: Date.now },
  username: String,
  imageUrl: String,
   activities:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity'
  }]
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;

