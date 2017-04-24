const mongoose = require('mongoose');
mongoose.set('debug', true);

const volunteerSchema = new mongoose.Schema({
  name: String,
  description: String,
  activity: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Activity'
	},
  hours: Number,
  points: Number,
  mediaUrl: String,
   timeCreated: { type: Date, default: Date.now },
   verified: Boolean
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);
module.exports = Volunteer;