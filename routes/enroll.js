var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Course = require('../models/course');

router.post('/add/:courseId', (req, res) => {
    if (req.isAuthenticated()) {
        Course.findById(req.params.courseId, (err, foundCourse) => {
            if (err) throw err;
            User.findById(req.user._id, (err, loggedUser) => {
                if(loggedUser.courses.indexOf(foundCourse._id) < 0){
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
    } else {
        req.flash('error', 'You need to be logged in to enroll!');
        res.redirect('/login')
    }
})

module.exports = router;