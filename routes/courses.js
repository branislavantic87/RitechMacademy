const express = require('express');
const router = express.Router();
const Course = require('../models/course');

// Pocetna ruta

router.get('/', (req, res) => {
    Course.find({}, (err, allCourses) => {
        if(err){ res.redirect('/') && console.log(err.message)}
        res.render('view', {courses: allCourses})
    })
})

//new 
router.get('/new', (req, res) => {
    res.render('new');
})

//create

router.post('/', (req, res) => {
    console.log(req.body);
    // if(!newCourse.image) delete newCourse.image;
    Course.create(req.body, (err, data) => {
        if(err){
            res.send(err.message)
        }else{
            res.json(data)
        }
    })
})

// Show

router.get('/:id', (req, res) => {
    var id = req.params.id;
    Course.findById(id, (err, data) => {
        if(err) throw err;
        res.render('show', {data: data})
    })
})

// Edit

router.get('/:id/edit', (req, res) => {
    var id = req.params.id;
    Course.findById(id, (err, result) => {
        if(err) throw err;
        res.render('edit' , {
            result
        });
    });
});

router.put('/:id', (req, res) => {
    var updatedCourse = {
        $set: {
            name: req.body.name,
            code: req.body.code,
            image: req.body.image,
            description: req.body.description
        }
    }
    Course.findByIdAndUpdate(req.params.id, updatedCourse, (err, result) => {
        if (err) throw err;
        res.redirect('/courses');
    })
})

router.delete('/:id', (req, res) => {
    Course.findByIdAndRemove(req.params.id, (err, result) => {
        if(err) throw err;
        console.log('Deleted: ', result);
        res.redirect('/courses')
    })
})




module.exports = router;