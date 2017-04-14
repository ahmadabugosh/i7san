const mongoose = require('mongoose');
mongoose.set('debug', true);

const organizationSchema = new mongoose.Schema({
  name: String,
  country: String, 
  activities:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Activity'
	}]
});

const Organization = mongoose.model('Organization', organizationSchema);
module.exports = Organization;