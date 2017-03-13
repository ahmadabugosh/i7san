const Project = require('../models/Project.js');

exports.getProjects = (req, res) => {
  Project.find((err, docs) => {
 res.render('projects', { 'projects': docs, title: 'Projects' });
  });
};

exports.createProjects = (req, res) => {

	const project= new Project({
		name:req.body.name,
		description: req.body.description,
		category: req.body.category,
		email: req.user.email
	});

	contribution.save().then((doc)=> {
		req.flash('success', { msg: 'Added!' });
        res.location('/projects');
        res.redirect('/projects');

	}, (e) => {

		res.status(400).send(e);

	});
};