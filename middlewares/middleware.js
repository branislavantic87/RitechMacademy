const Course = require('../models/course');
const User = require('../models/user');
var m = {};

m.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error', 'U are not logger in');
        res.redirect('/login');
    }
}

m.isAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.type === 'admin') {
            return next();
        } else {
            req.flash('error', 'U are not admin fuck off!')
            res.redirect('back');
        }
    } else {
        req.flash('error', 'U are not logger in');
        res.redirect('/login');
    }
}
m.isStudent = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.type === 'student') {
            return next();
        } else {
            req.flash('error', 'You need to be student to do that!')
            res.redirect('/login');
        }
    } else {
        eq.flash('error', 'U are not logger in');
        res.redirect('/login');
    }
}

m.isTeacher = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.type === 'teacher') {
            return next();
        } else {
            req.flash('error', 'You need to be teacher to do that!')
            res.redirect('/courses');
        }
    } else {
        req.flash('error', 'You are not logged in!')
        res.redirect('/login');
    }
}

m.checkCourseOwnership = (req, res, next) => {
    if (req.isAuthenticated()) {
        Course.findById(req.params.id, (err, foundCourse) => {
            if(err || !foundCourse){
                req.flash('error', 'Course does not exist');
                res.redirect('/courses')
            } else {
                if(foundCourse.teacher.equals(req.user._id) ||  req.user.type == 'admin') {
                    return next();
                } else {
                    req.flash('error', 'You did not create this course!')
                    res.redirect('/courses')
                }
            }
        })
    } else {
        req.flash('error', 'You are not logged in!')
        res.redirect('/login');
    }
}

m.checkUserOwnership = (req, res, next) => {
    if (req.isAuthenticated()) {
        User.findById(req.params.id, (err, foundUser) => {
            if(err || !foundUser){
                req.flash('error', 'Course does not exist');
                res.redirect('/courses')
            } else {
                if(foundUser._id.equals(req.user._id) ||  req.user.type == 'admin') {
                    return next();
                } else {
                    req.flash('error', 'You dont have!')
                    res.redirect('/courses')
                }
            }
        })
    } else {
        req.flash('error', 'You are not logged in!')
        res.redirect('/login');
    }
}

m.checkIfEnrolled = (req, res, next) => {
    User.findById()
}


module.exports = m;