const Seat = require('./../models/seats.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
    try {
        const seats = await Seat.find();
        if(seats.length > 0) res.json(seats);
        else res.status(404).json({  message: 'Empty seats database.' });
    } catch {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.getOne = async (req, res) => {
    try {
        const selectedData = await Seat.findById(req.params.id);
        if(selectedData) res.json(selectedData);
        else res.status(404).json({ message: 'This id does not exist.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.addNew = async (req, res) => {
    try {     
        const parsedDay = parseInt(sanitize(req.body.day));
        const parsedSeat = parseInt(sanitize(req.body.seat));
        const client = sanitize(req.body.client);
        const email = sanitize(req.body.email);
        if(parsedDay && parsedSeat && client && email) {
            if(!isNaN(parsedDay) && !isNaN(parsedSeat)) {
                const reservedSeat = await Seat.findOne({ day: parsedDay, seat: parsedSeat });
                if(!reservedSeat){
                    const newSeat = new Seat({ day: parsedDay, seat: parsedSeat, client, email });
                    newSeat.save();
                    req.io.emit('seatsUpdated', await Seat.find());
                    res.json({ message: 'OK' });
                } else res.status(409).json({ message: 'The slot is already taken...' });
            } else res.status(400).json({ message: 'Invalid day or seat value.'})
        } else res.status(400).json({ message: 'All params are required.'});
    } catch(error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.editOne = async (req, res) => {
    try {
        const parsedDay = parseInt(sanitize(req.body.day));
        const parsedSeat = parseInt(sanitize(req.body.seat));
        const client = sanitize(req.body.client);
        const email = sanitize(req.body.email);
        const dataToEdit = await Seat.findById(req.params.id);
        if(dataToEdit) {
            if(parsedDay && parsedSeat && client && email) {
                if(!isNaN(parsedDay) && !isNaN(parsedSeat)) {
                    const reservedSeat = await Seat.findOne({ day: parsedDay, seat: parsedSeat });
                    if(!reservedSeat || reservedSeat.seat === dataToEdit.seat){
                        await dataToEdit.updateOne({$set: {day: parsedDay, seat: parsedSeat, client, email}});
                        res.json( { message: 'OK' });
                    } else res.status(409).json({ message: 'The slot is already taken...' });
                } else res.status(400).json({ message: 'Invalid day or seat value.'});
            } else res.status(400).json({ message: 'All params are required.' });
        } else res.status(404).json({ message: 'This id does not exist.' });
    } catch(error){
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.removeOne = async (req, res) => {
    try {
        const dataToRemove = await Seat.findById(req.params.id);
        if(dataToRemove){
            await dataToRemove.deleteOne();
            res.json({ message: 'OK' });
        } else res.status(404).json({ message: 'This id does not exist...' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error'});
    }
}
