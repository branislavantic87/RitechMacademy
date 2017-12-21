const mongoose = require('mongoose');
const PassLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    image: {
        type: String,
        default: 'http://via.placeholder.com/350x150'
    },
    email: {
        type: String,
        required: [true, 'Email is missing'],
        unique: true
    },
    kind: {
        type: String,
        enum: ['admin', 'teacher', 'student'],
        default: 'student'
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isPromote: {
        type: Boolean,
        default: false
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: String
})

userSchema.plugin(PassLocalMongoose);

module.exports = mongoose.model('User', userSchema)