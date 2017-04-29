const Activity = require('../models/Activity.js');

exports.getActivities = (req, res) => {
  Activity.find((err, docs) => {
 res.render('activities', { 'activities': docs, title: 'Activities' });
  });
};

exports.getActivity = (req, res) => {
 Activity.find({ 'shortUrl': req.params.activityid },(err, docs) => {
 res.render('activity', { 'activities': docs, title: req.params.activityid+'Activity'  });
  });

};


exports.addActivity = (req, res) => {

 res.render('add-activity', { title: 'Add An Activity'  });
 
};

exports.createActivity = (req, res) => {

var shortUrl = req.body.name;
shortUrl = shortUrl.replace(/\s+/g, '-').toLowerCase();
	const activity= new Activity({
		name:req.body.name,
		description: req.body.description,
		hours: req.body.hours,
		points: req.body.points,
		shortUrl: shortUrl


	});

	activity.save().then((doc)=> {
		req.flash('success', { msg: 'Added!' });
        res.location('/volunteer');
        res.redirect('/volunteer');

	}, (e) => {

		res.status(400).send(e);

	});
};
