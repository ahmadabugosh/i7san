const Organization = require('../models/Organization.js');
const Project = require('../models/Project.js');
const Activity = require('../models/Activity.js');




exports.getOrganizations = (req, res) => {
  Organization.find((err, docs) => {
 res.render('organizations', { 'organizations': docs, title: 'Organizations' });
  });
};

exports.getOrganization = (req, res) => {
  Organization.find({'shortUrl': req.params.organizationid},(err, docs) => {
 res.render('organizations', { 'organizations': docs, title: req.params.organizationid+'- Organization' });
  });
};


exports.addProjects = (req, res) => {
  Organization.find((err, docs) => {
 res.render('addproject', { 'organizations': docs, title: 'Add A Project'  });
  });
};


exports.createProjects = (req, res) => {

const project= new Project({
		name:req.body.name,
		description: req.body.description,
		category: req.body.category,
		email: req.user.email,
		imageUrl: req.file.filename
	});

	 Organization.findOne({name: req.body.org})
		.then ((user) => {


	user.projects.push(project);
		Promise.all([user.save(),project.save()]).then((doc)=> {
		req.flash('success', { msg: 'Added!' });
        res.location('/organizations');
        res.redirect('/organizations');
     console.log('testing123');

	}, (e) => {

		res.status(400).send(e);

	});
		});
	
};

exports.addOrganization = (req, res) => {
  Activity.find((err, docs) => {
 res.render('add-organization', { 'activities': docs, title: 'Add Organization'  });
  });
};


exports.createOrganization = (req, res) => {

var shortUrl = req.body.name;
shortUrl = shortUrl.replace(/\s+/g, '-').toLowerCase();

const organization= new Organization({
		name:req.body.name,
		category: req.body.activity,
		shortUrl: shortUrl
	});

	 Activity.findOne({name: req.body.activity})
		.then ((activity) => {
organization.activities.push(activity);
organization.save();
		});

		organization.save().then((doc)=> {
		req.flash('success', { msg: 'Added!' });
        res.location('/organizations');
        res.redirect('/organizations');

	}, (e) => {

		res.status(400).send(e);

	});





	
	
};


