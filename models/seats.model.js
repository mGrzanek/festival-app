const mongoose = require('mongoose');

const seatSchema = mongoose.Schema({
    day: { type: Number, required: true },
    seat: { type: Number, required: true },
    client: { type: String, required: true },
    email: { type: String, required: true },
});

module.exports = new mongoose.model('Seat', seatSchema);