const Organization = require('../models/Organization.js');
const Project = require('../models/Project.js');




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


