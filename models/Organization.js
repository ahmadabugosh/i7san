const mongoose = require('mongoose');
mongoose.set('debug', true);

const organizationSchema = new mongoose.Schema({
  name: String,
  country: String, 
  activities:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Activity'
	}],
	projects:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Project'
	}],
	users:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}]
});

const Organization = mongoose.model('Organization', organizationSchema);
module.exports = Organization;