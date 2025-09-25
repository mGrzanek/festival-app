const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    author: { type: String, required: true, minlength: 3, maxlength: 60, trim: true },
    text: { type: String, required: true, minlength: 3, maxlength: 100, trim: true },
});

module.exports = mongoose.model('Testimonial', testimonialSchema);