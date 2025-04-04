const mongoose = require('mongoose');

const concertSchema = mongoose.Schema({
    performer: { type: String, required: true },
    genre: { type: String, required: true },
    price: { type: Number, required: true },
    day: { type: Number, required: true },
    image: { type: Number, required: true },
});

module.exports = new mongoose.model('Concert', concertSchema);