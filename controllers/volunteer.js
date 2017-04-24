const Volunteer = require('../models/Volunteer.js');

exports.getVolunteer = (req, res) => {
  Volunteer.find((err, docs) => {
 res.render('volunteer', { 'volunteering': docs, title: 'Volunteer' });
  });
};
