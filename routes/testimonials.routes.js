const express = require('express');
const router = express.Router();
const db = require('./../db/db');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();

router.route('/testimonials/random').get((req, res) => {
    try {
        if(db.testimonials.length > 0) {
            const randomData = db.testimonials[Math.floor(Math.random() * db.testimonials.length)];
            res.json(randomData);
        } else {
            res.status(404).json({ message: 'Empty testimonials database.'});
        }
        
    } catch (error){
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

router.route('/testimonials').get((req, res) => {
    try {
        if(db.testimonials.length > 0) res.json(db.testimonials);
        else res.status(404).json({ message: 'Empty testimonials database.'});
    } catch(error) {
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

router.route('/testimonials/:id').get((req, res) => {
    try {
        const selectedData = db.testimonials.find(data => data.id === req.params.id);
            if(selectedData){
                res.json(selectedData);
            } else {
                res.status(404).json({ message: 'This id does not exist.' });
            } 
    } catch(error) {
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

router.route('/testimonials').post((req, res) => {
    try {
        const { author, text } = req.body;

        if( author && text ) {
            db.testimonials.push({ id: uuid, author, text });
            res.json({ message: 'OK' });
        } else {
            res.status(400).json({ message: 'All params are required.' });
        }
    } catch(error) {
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

router.route('/testimonials/:id').put((req, res) => {
    try {
        const { author, text } = req.body;
        const dataToEdit = db.testimonials.find(data => data.id === req.params.id);
        if(dataToEdit){
            if(author && text) {
                Object.assign(dataToEdit, {author, text});
                res.json({ message: 'OK' });
            } else {
                res.status(400).json({ message: 'All params are required.' });
            }
        } else {
            res.status(404).json({ message: 'This id does not exist.' });
        }
    } catch(error){
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

router.route('/testimonials/:id').delete((req, res) => {
    try {
        const dataToRemove = db.testimonials.find(data => data.id === req.params.id);
        if(dataToRemove) {
            const dataToRemoveIndex = db.testimonials.indexOf(dataToRemove);
            db.testimonials.splice(dataToRemoveIndex, 1);
            res.json({ message: 'OK '});
        } else {
            res.status(404).json({ message: 'This id does not exist.' });
        }
    } catch(error) {
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

module.exports = router;