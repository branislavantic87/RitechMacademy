var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

router.get('/register', (req, res) => {
    res.render('auth/register');
})
// sign up
router.post('/register', (req, res) => {
    var newUser = new User({
        username: req.body.username,
        email: req.body.email
    })
    User.register(newUser, req.body.password, (err, data) => {
        if (err) {
            console.log(err);
            res.redirect('/register');
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/courses')
            })
        }
    })
})
// login
router.get('/login', (req, res) => {
    res.render('auth/login');
})

router.post('/login',passport.authenticate('local',  {
    successRedirect: ('/courses'),
    failureRedirect: ('/login'),
    failureFlash: true
}), (req, res) => {

})

router.get('/logout', (req, res) => {
    if(req.isAuthenticated()){
        req.logOut('Success', 'Logged out');
        res.redirect('/courses')
    } else {
        res.redirect('/courses')
    }
})

module.exports = router;