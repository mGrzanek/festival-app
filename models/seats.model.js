const mongoose = require('mongoose');

const seatSchema = mongoose.Schema({
    day: { type: Number, min: 1, max: 3, required: true },
    seat: { type: Number, min: 1, max: 50, required: true },
    client: { type: String, minlength: 3, maxlength: 60, match: /^[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż -]+$/, required: true, trim: true},
    email: { type: String, minlength: 6, maxlength: 40,  match: /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, required: true, trim: true},
});

module.exports = new mongoose.model('Seat', seatSchema);