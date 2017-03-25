const mongoose = require('mongoose');
mongoose.set('debug', true);

const organizationSchema = new mongoose.Schema({
  name: String,
  country: String, 
  projects:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Project'
	}]
});

const Organization = mongoose.model('Organization', organizationSchema);
module.exports = Organization;