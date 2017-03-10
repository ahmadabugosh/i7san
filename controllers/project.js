const Project = require('../models/Project.js');

exports.getProjects = (req, res) => {
  Project.find((err, docs) => {
 res.render('projects', { 'projects': docs, title: 'Projects' });
  });
};