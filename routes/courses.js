var express = require('express');
var router = express.Router();
var Course = require('../models/course');


// INDEX
router.get('/', (req, res) => {
    Course.find({}, (err, allCourses) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('/courses');
        } else {
            res.render('courses/index', { courses: allCourses });
            //res.json(allCourses);
        }
    })
});

// NEW
router.get('/new', (req, res) => {
    res.render('courses/new');
});

// CREATE
router.post('/', (req, res) => {
    if (req.body.image === '') delete req.body.image;
    Course.create(req.body, (err, created) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('/courses');
        } else {
            req.flash('success', 'New course created!');
            res.redirect('/courses');
        }
    })
})

// SHOW
router.get('/:id', (req, res) => {
    Course.findById(req.params.id).populate('students.data').exec((err, foundCourse) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('/courses');
        } else {
            res.render('courses/show', { course: foundCourse });
        }
    })
})

// EDIT
router.get('/:id/edit', (req, res) => {
    Course.findById(req.params.id, (err, foundCourse) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('/courses');
        } else {
            res.render('courses/edit', { course: foundCourse });
        }
    })
})

// UPDATE
router.put('/:id', (req, res) => {
    var newData = {
        $set: {
            name: req.body.name,
            code: req.body.code,
            //image: req.body.image,
            description: req.body.description
        }
    };
    req.body.image === "" ? newData.$unset = { image: "" } : newData.$set.image = req.body.image;
    Course.findByIdAndUpdate(req.params.id, newData, { new: true }, (err, updated) => {
        if (err) {
            req.flash('error', err.message);
            console.log(err);
            res.redirect('/courses');
        } else {
            req.flash('success', 'Successfully Updated!');
           
            res.redirect('/courses/' + updated.id);
        }
    })
})

// DELETE
router.delete('/:id', (req, res) => {
    Course.findById(req.params.id, (err, removed) => {
        if(err) {
            req.flash('error', err.message);
            res.redirect('/courses');
        } else {
            removed.remove();
            req.flash('success', 'Successfully Removed!');
            res.redirect('/courses');
        }
    })
})


module.exports = router;