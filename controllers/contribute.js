/**
 * GET /contribute
 * List all contributions.
 */

// const async = require('async');
// const crypto = require('crypto');
// const nodemailer = require('nodemailer');
// const passport = require('passport');
const Contribute = require('../models/Contribute.js');

exports.getContributions = (req, res) => {
  Contribute.find((err, docs) => {
 res.render('contributions', { 'contributions': docs, title: 'Contributions' });
  });
};

exports.getMyContributions = (req, res) => {
  Contribute.find({ 'email': req.user.email },(err, docs) => {
 res.render('contributions', { 'contributions': docs, title: 'My Contributions'  });
  });
};


exports.addContributions = (req, res) => {
  Contribute.find((err, docs) => {
 res.render('add', { 'contributions': docs, title: 'Add A Contribution'  });
  });
};

exports.createContributions = (req, res) => {

	const contribution= new Contribute({
		name:req.body.name,
		amount: req.body.amount,
		email: req.user.email
	});

	contribution.save().then((doc)=> {
		req.flash('success', { msg: 'Added!' });
        res.location('/contributions');
        res.redirect('/contributions');

	}, (e) => {

		res.status(400).send(e);

	});
};