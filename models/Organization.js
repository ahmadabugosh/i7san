const mongoose = require('mongoose');
mongoose.set('debug', true);

const organizationSchema = new mongoose.Schema({
  name: String,
  country: String,
  description: String,
  logo: String, 
  rating: String,
  category: String, 
  activities:[String],
	projects:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Project'
	}],
	users:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	shortUrl: String
});

const Organization = mongoose.model('Organization', organizationSchema);
module.exports = Organization;