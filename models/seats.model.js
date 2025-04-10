const mongoose = require('mongoose');

const seatSchema = mongoose.Schema({
    day: { type: Number, min: 1, max: 3, required: true },
    seat: { type: Number, min: 1, max: 50, required: true },
    client: { type: String, required: true },
    email: { type: String, required: true },
});

module.exports = new mongoose.model('Seat', seatSchema);