var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Course = require('../models/course');
var mongoose = require('mongoose');
const m = require('../middlewares/middleware');

router.post('/add/:courseId', m.isLoggedIn , (req, res) => {

        Course.findById(req.params.courseId, (err, foundCourse) => {
            if (err) throw err;
            User.findById(req.user._id, (err, loggedUser) => {
                if (loggedUser.courses.indexOf(foundCourse._id) < 0) {
                    foundCourse.students.push({ data: loggedUser._id });
                    foundCourse.save();
                    loggedUser.courses.push(foundCourse._id);
                    loggedUser.save();
                    req.flash('success', 'Uspesno dodat!');
                    res.redirect('/courses')
                } else {
                    req.flash('error', 'You allready enrolled in this coures');
                    res.redirect('/courses')
                }
            })
        })
    }
)

router.post('/unroll/:cId', m.isLoggedIn, (req, res) => {
        Course.findById(req.params.cId, (err, foundCourse) => {
            if (err) {
                req.flash('error', 'Some error occured');
            }
            User.findById(req.user._id, (err, loggedUser) => {
                if (err) {
                    req.flash('error', 'Some error occured');
                }
                if (loggedUser.courses.indexOf(foundCourse._id) >=0) {
                    loggedUser.courses.pull( foundCourse._id )
                    loggedUser.save()
                    req.flash('success', 'Uspesno obrisan!');
                    res.redirect('/courses')
                    mongoose.model('Course').update(
                        { _id: foundCourse._id },
                        { $pull: { students: { data: loggedUser._id } } },
                        function(err, numAffected){
                        }
                    )

                } else {
                    req.flash('error', 'You were not enrolled in this coures');
                    res.redirect('/courses')
                }
            })
        })
    } 
)

module.exports = router;