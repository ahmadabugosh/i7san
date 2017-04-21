const Activity = require('../models/Activity.js');

exports.getActivities = (req, res) => {
  Activity.find((err, docs) => {
 res.render('activities', { 'activities': docs, title: 'Activities' });
  });
};

exports.getActivity = (req, res) => {
 Activity.find({ 'name': req.params.activityid },(err, docs) => {
 res.render('activity', { 'activities': docs, title: req.params.activityid+'Project'  });
  });

};