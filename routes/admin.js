var express = require('express');
var router = express.Router();
var User = require('../models/user');
const m = require('../middlewares/middleware');
var Course = require('../models/course');


router.get('/', m.isAdmin, (req, res) => {
    res.render('admin/index')
})

router.get('/courses', m.isAdmin, (req, res) => {
    Course.find({}, (err, foundCourses) => {
        if(err){
            req.flash('error', 'Some error occured!');
            res.redirect('/admin/courses')
        } else {
            res.render('admin/courses', {allCourses: foundCourses})
        }
    })    
})


module.exports = router;