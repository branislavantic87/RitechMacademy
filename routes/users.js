const express = require('express');
const router = express.Router();
const User = require('../models/user');


/* GET users listing. */
router.get('/', (req, res) => {
  User.find({}, (err, allUsers) => {
    if(err) throw err.message;
    res.render('students/index', {users: allUsers})
  });
});

// show

router.get('/:id', (req, res) => {
  var id = req.params.id;
  User.findById(id, (err, data) => {
    if(err) throw err;
    res.render('students/show', {data: data})
  });
});

//  Edit

router.get('/:id/edit', (req, res) => {
  var id = req.params.id;
  User.findById(id, (err, data) => {
    if(err) throw err;
    res.render('students/edit', {data})
  });
});

// Update
router.put('/:id', (req, res) => {
  var updateUser = {
    $set: req.body  
  }
req.body.image === '' ? updateUser.$unset = {image: ''} : updateUser.$set.image = req.body.image;

  User.findByIdAndUpdate(req.params.id, updateUser, (err, updatedUser) => {
    if(err) throw err;
    res.redirect('/')
  })
})
// Delete 
router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, result) => {
    if(err) throw err;
    console.log('Deleted this user: ', result.firstName)
    res.redirect('/')
  })
})



module.exports = router;
