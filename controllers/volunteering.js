const Volunteering = require('../models/Volunteering.js');
const Activity = require('../models/Activity.js');
const User = require('../models/User.js');

exports.getVolunteering = (req, res) => {
  Volunteering.find((err, docs) => {
 res.render('volunteering', { 'volunteering': docs, title: 'Volunteer' });
  });
};


exports.addVolunteering = (req, res) => {
  Activity.find((err, docs) => {
 res.render('add-volunteering', { 'activities': docs, title: 'Add Volunteering'  });
  });
};

exports.addVolunteeringID = (req, res) => {
 Activity.find({ 'shortUrl': req.params.activityid },(err, docs) => {
 res.render('add-volunteering', { 'activities': docs, title: 'Add Volunteering - '+req.params.activityid });
  });

};

exports.createVolunteering = (req, res) => {


	const volunteering= new Volunteering({
		name:req.body.name,
		activity: req.body.activity
	});

	// volunteering.save().then((doc)=> {
	// 	req.flash('success', { msg: 'Added!' });
 //        res.location('/volunteering');
 //        res.redirect('/volunteering');

	// }, (e) => {

	// 	res.status(400).send(e);

	// });

	 User.findOne({_id: req.user._id})
	 .then ((user) => {
	user.volunteering.push(volunteering);
		Promise.all([user.save(),volunteering.save()]).then((doc)=> {
		req.flash('success', { msg: 'Added!' });
        res.location('/volunteering');
        res.redirect('/volunteering');

	}, (e) => {

		res.status(400).send(e);

	});
		});
	



};
