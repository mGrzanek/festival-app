const express = require('express');
const router = express.Router();
const Concert = require('./../models/concerts.models');

router.route('/concerts').get( async (req, res) => {
    try {
        const concerts = await Concert.find();
        if(concerts.length > 0) res.json(concerts);
        else res.status(404).json({ message: 'Empty concerts database.' });
    } catch(error) {
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

router.route('/concerts/:id').get( async (req, res) => {
    try {
        const selectedData = await Concert.findById(req.params.id);
        if(selectedData) res.json(selectedData);
        else res.status(404).json({ message: 'This id does not exist.' });
    } catch(error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.route('/concerts').post( async (req, res) => {
    try{
        const { performer, genre, price, day, image } = req.body;
        if( performer && genre && price && day && image ) {
            const parsedPrice = parseInt(price);
            const parsedDay = parseInt(day);
            if(!isNaN(parsedDay) && !isNaN(parsedPrice)){
                const newConcert = new Concert({ performer, genre, price, day, image });
                await newConcert.save();
                res.json({ message: 'OK' });
            } else res.status(400).json({ message: 'Invalid price or day value.'});
        } else res.status(400).json({ message: 'All params are required.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.route('/concerts/:id').put( async (req, res) => {
    try {
        const dataToEdit = await Concert.findById(req.params.id);
        const { performer, genre, price, day, image } = req.body;
        if(dataToEdit){
            if(performer && genre && price && day && image) {
                const parsedPrice = parseInt(price);
                const parsedDay = parseInt(day);
                if(!isNaN(parsedDay) && !isNaN(parsedPrice)){
                    await dataToEdit.updateOne({$set: {performer, genre, price: parsedPrice, day: parsedDay, image}});
                    res.json({ message: 'OK' });
                } else res.status(400).json({ message: 'Invalid price or day value.' });
            } else res.status(400).json({ message: 'All params are required.' });
        } else res.status(404).json({ message: 'This id does not exist.' })
    } catch(error) {
        res.status(500).json({ message: 'Internal Server Error'} );
    }
});

router.route('/concerts/:id').delete( async (req, res) => {
    try {
        const dataToRemove = await Concert.findById(req.params.id);
        if(dataToRemove){
            await dataToRemove.deleteOne();
            res.json({ message: 'OK' });
        } else res.status(404).json({ message: 'This id does not exist.'});
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;