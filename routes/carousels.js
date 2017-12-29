var express = require('express');
var router = express.Router();
const Carousel = require('../models/carousel');
var multer = require('multer');
var upload = multer( { dest: './content' } )
var m = require('../middlewares/middleware')

router.get('/', (req, res) => {
    res.render('carousel/new');
})

router.post('/', m.isAdmin , upload.single('pic'), (req, res) => {
    var newCar = {
        picture: req.file,
        link: req.body.link
    }
    Carousel.create(newCar, (err, created) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('/courses');
        } else {
            req.flash('success', 'New image saved ! ');
            console.log(req.body)
            res.redirect('/courses');
        }
    })
})

router.get('/:id/edit', m.isAdmin, (req, res) => {
    Carousel.findById(req.params.id, (err, foundPicture) => {
        if(err){
            req.flash('error', 'Some error occured')
            res.redirect('/carousel/')
        } else {
            res.render('/edit', {picture: foundPicture})
        }
    })
})




module.exports = router;