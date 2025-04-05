const express = require('express');
const router = express.Router();
const Seat = require('./../models/seats.model');

router.route('/seats').get( async (reg, res) => {
    try {
        const seats = await Seat.find();
        if(seats.length > 0) res.json(seats);
        else res.status(404).json({  message: 'Empty seats database.' });
    } catch {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.route('/seats/:id').get( async (req, res) => {
    try {
        const selectedData = await Seat.findById(req.params.id);
        if(selectedData) res.json(selectedData);
        else res.status(404).json({ message: 'This id does not exist.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.route('/seats').post( async (req, res) => {
    try {
        const { day, seat, client, email } = req.body;
        const parsedDay = parseInt(day);
        const parsedSeat = parseInt(seat);
        if(day && seat && client && email) {
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
});

router.route('/seats/:id').put( async (req, res) => {
    try {
        const { day, seat, client, email } = req.body;
        const parsedDay = parseInt(day);
        const parsedSeat = parseInt(seat);
        const dataToEdit = await Seat.findById(req.params.id);
        if(dataToEdit) {
            if(day && seat && client && email) {
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
});

router.route('/seats/:id').delete( async (req, res) => {
    try {
        const dataToRemove = await Seat.findById(req.params.id);
        if(dataToRemove){
            await dataToRemove.deleteOne();
            res.json({ message: 'OK' });
        } else res.status(404).json({ message: 'This id does not exist...' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

module.exports = router;