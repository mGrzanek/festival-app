const express = require('express');
const router = express.Router();
const db = require('./../db/db');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();

router.route('/concerts').get((req, res) => {
    try {
        if(db.concerts.length > 0) res.json(db.concerts);
        else res.status(404).json({ message: 'Empty concerts database.' });
    } catch(error) {
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

router.route('/concerts/:id').get((req, res) => {
    try {
        const selectedData = db.concerts.find(data => data.id === req.params.id);
        if(selectedData) res.json(selectedData);
        else res.status(404).json({ message: 'This id does not exist.' });
    } catch(error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.route('/concerts').post((req, res) => {
    try{
        const { performer, genre, price, day, image } = req.body;
        if( performer && genre && price && day && image ) {
            const parsedPrice = parseInt(price);
            const parsedDay = parseInt(day);
            if(!isNaN(parsedDay) && !isNaN(parsedPrice)){
                db.concerts.push({ id: uuid, performer, genre, price: parsedPrice, day: parsedDay, image });
                res.json({ message: 'OK' });
            } else res.status(400).json({ message: 'Invalid price or day value.'});
        } else res.status(400).json({ message: 'All params are required.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.route('/concerts/:id').put((req, res) => {
    try {
        const dataToEdit = db.concerts.find(data => data.id === req.params.id);
        const { performer, genre, price, day, image } = req.body;
        if(dataToEdit){
            if(performer && genre && price && day && image) {
                const parsedPrice = parseInt(price);
                const parsedDay = parseInt(day);
                if(!isNaN(parsedDay) && !isNaN(parsedPrice)){
                    Object.assign(dataToEdit, {performer, genre, price, day, image});
                    res.json({ message: 'OK' });
                } else res.status(400).json({ message: 'Invalid price or day value.' });
            } else res.status(400).json({ message: 'All params are required.' });
        } else res.status(404).json({ message: 'This id does not exist.' })
    } catch(error) {
        res.status(500).json({ message: 'Internal Server Error'} );
    }
});

router.route('/concerts/:id').delete((req, res) => {
    try {
        const dataToRemove = db.concerts.find(data => data.id === req.params.id);
        if(dataToRemove){
            const dataToRemoveIndex = db.concerts.indexOf(dataToRemove);
            db.concerts.splice(dataToRemoveIndex, 1);
            res.json({ message: 'OK' });
        } else res.status(404).json({ message: 'This id does not exist.'});
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;