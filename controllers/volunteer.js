const Volunteer = require('../models/Volunteer.js');
const Activity = require('../models/Activity.js');

exports.getVolunteer = (req, res) => {
  Volunteer.find((err, docs) => {
 res.render('volunteer', { 'volunteering': docs, title: 'Volunteer' });
  });
};


exports.addVolunteering = (req, res) => {
  Activity.find((err, docs) => {
 res.render('add-volunteering', { 'activities': docs, title: 'Add Volunteering'  });
  });
};

exports.createVolunteering = (req, res) => {


	const volunteering= new Volunteer({
		name:req.body.name,
		description: req.body.description,
		category: req.body.category,
		activity: req.body.activity
	});

	volunteering.save().then((doc)=> {
		req.flash('success', { msg: 'Added!' });
        res.location('/volunteering');
        res.redirect('/volunteering');

	}, (e) => {

		res.status(400).send(e);

	});



};
