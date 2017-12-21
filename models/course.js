const mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
    name: String,
    code: {
        type: String,
        unique: true,
        required: true
    },
    image: {
        type: String,
        default: 'http://via.placeholder.com/350x150'
    },
    description: String
})

module.exports = mongoose.model('Course', courseSchema)