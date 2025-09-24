const mongoose = require('mongoose');

const concertSchema = mongoose.Schema({
    performer: { type: String, required: true, minlength: 1, maxlength: 45, trim: true },
    genre: { type: String, required: true, minlength: 1, maxlength: 25, trim: true },
    price: { type: Number, required: true, min: 1 },
    day: { type: Number, required: true, min: 1, max: 3 },
    image: { 
        type: String, 
        required: true, 
        minlength: 5,
        maxlength: 40, 
        trim: true,
        validate: {
            validator: function(val) {
                const arr = val.split('.');
                const ext = arr.pop().toLowerCase().trim();
                const filename = arr[0].trim();
                return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext) && filename.length > 0;
            },
            message: 'Wrong image file (only .jpg, .jpeg, .png, .webp, .gif allowed).'
        }},
    workshops: {
        type: [String],
        required: true, 
        validate: {
            validator: function (val) {
                return Array.isArray(val) && val.length > 0 && val.every(v => v.length > 1 && v.length <= 30);
            },
            message: 'Workshops must be a non-empty array',
        }, 
    },
});

module.exports = new mongoose.model('Concert', concertSchema);