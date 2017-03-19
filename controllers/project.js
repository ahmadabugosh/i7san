const Project = require('../models/Project.js');

exports.getProjects = (req, res) => {
  Project.find((err, docs) => {
 res.render('projects', { 'projects': docs, title: 'Projects' });
  });
};


exports.getMyProjects = (req, res) => {
  Project.find({ 'email': req.user.email },(err, docs) => {
 res.render('projects', { 'projects': docs, title: 'My Projects'  });
  });
};

exports.addProjects = (req, res) => {
  Project.find((err, docs) => {
 res.render('add', { 'projects': docs, title: 'Add A Project'  });
  });
};

exports.createProjects = (req, res) => {

	const project= new Project({
		name:req.body.name,
		description: req.body.description,
		category: req.body.category,
		email: req.user.email
	});

	project.save().then((doc)=> {
		req.flash('success', { msg: 'Added!' });
		console.log(req);
        res.location('/projects');
        res.redirect('/projects');

	}, (e) => {

		res.status(400).send(e);

	});
};
