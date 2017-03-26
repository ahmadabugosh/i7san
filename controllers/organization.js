const Organization = require('../models/Organization.js');
const Project = require('../models/Project.js');


exports.getOrganizations = (req, res) => {
  Organization.find((err, docs) => {
 res.render('organizations', { 'organizations': docs, title: 'Organizations' });
  });
};



exports.addProjects = (req, res) => {
  Project.find((err, docs) => {
 res.render('addproject', { 'organizations': docs, title: 'Add A Project'  });
  });
};


exports.createProjects = (req, res) => {

	console.log(req.body);
	console.log("look up");

	const organization = new Organization ({

		name: req.body.org
	});

	const project= new Project({
		name:req.body.name,
		description: req.body.description,
		category: req.body.category,
		email: req.user.email,
		imageUrl: req.file.filename
	});

	organization.projects.push(project);


	Promise.all([organization.save(),project.save()]).then((doc)=> {
		req.flash('success', { msg: 'Added!' });
        res.location('/organizations');
        res.redirect('/organizations');
     console.log('testing123');

	}, (e) => {

		res.status(400).send(e);

	});
};