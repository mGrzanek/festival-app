const express = require('express');
const db = require('./db/db');
const { v4: uuidv4 } = require('uuid');
const app = express();
const cors = require('cors');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const uuid = uuidv4();

app.get('/testimonials/random', (req, res) => {
    try {
        if(db.testimonials.length > 0) {
            const randomData = db.testimonials[Math.floor(Math.random() * db.testimonials.length)];
            res.json(randomData);
        } else {
            res.status(404).json({ message: 'Database is not avalable.'});
        }
        
    } catch (error){
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

app.get('/testimonials', (req, res) => {
    try {
        if(db.testimonials.length > 0) res.json(db.testimonials);
        else res.status(404).json({ message: 'Database is not avalable.'});
    } catch(error) {
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

app.get('/testimonials/:id', (req, res) => {
    try {
        const selectedData = db.testimonials.find(data => data.id == req.params.id);
            if(selectedData){
                res.json(selectedData);
            } else {
                res.status(404).json({ message: 'This id does not exist.' });
            } 
    } catch(error) {
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

app.post('/testimonials', (req, res) => {
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

app.put('/testimonials/:id', (req, res) => {
    try {
        const { author, text } = req.body;
        const dataToEdit = db.testimonials.find(data => data.id == req.params.id);
        if(dataToEdit){
            if(author, text) {
                dataToEdit.author = author;
                dataToEdit.text = text;
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

app.delete('/testimonials/:id', (req, res) => {
    try {
        const dataToRemove = db.testimonials.find(data => data.id == req.params.id);
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

app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000')
});