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
            if(author && text) {
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

app.get('/concerts', (req, res) => {
    try {
        if(db.concerts.length > 0) res.json(db.concerts);
        else res.status(404).json({ message: 'Database is not avalable.' });
    } catch(error) {
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

app.get('/concerts/:id', (req, res) => {
    try {
        const selectedData = db.concerts.find(data => data.id == req.params.id);
        if(selectedData) res.json(selectedData);
        else res.status(404).json({ message: 'This id does not exist.' });
    } catch(error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/concerts', (req, res) => {
    try{
        const { performer, genre, price, day, image } = req.body;
        if( performer && genre && price && day && image ) {
            db.concerts.push({ id: uuid, performer, genre, price, day, image });
            res.json({ message: 'OK' });
        } else {
            res.status(400).json({ message: 'All params are required.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.put('/concerts/:id', (req, res) => {
    try {
        const dataToEdit = db.concerts.find(data => data.id == req.params.id);
        const { performer, genre, price, day, image } = req.body;
        if(dataToEdit){
            if(performer && genre && price && day && image) {
                dataToEdit.performer = performer;
                dataToEdit.genre = genre;
                dataToEdit.price = price;
                dataToEdit.day = day;
                dataToEdit.image = image;
                res.json({ message: 'OK' });
            } else {
                res.status(400).json({ message: 'All params are required.' });
            }
        } else res.status(404).json({ message: 'This id does not exist.' })
    } catch(error) {
        res.status(500).json({ message: 'Internal Server Error'} );
    }
});

app.delete('/concerts/:id', (req, res) => {
    try {
        const dataToRemove = db.concerts.find(data => data.id == req.params.id);
        if(dataToRemove){
            const dataToRemoveIndex = db.concerts.indexOf(dataToRemove);
            db.concerts.splice(dataToRemoveIndex, 1);
            res.json({ message: 'OK' });
        } else res.status(404).json({ message: 'This id does not exist.'});
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/seats', (reg, res) => {
    try {
        if(db.seats.length > 0) res.json(db.seats);
        else res.status(404).json({  message: 'Database is not avalable.' });
    } catch {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/seats/:id', (req, res) => {
    try {
        const selectedData = db.seats.find(data => data.id == req.params.id);
        if(selectedData) res.json(selectedData);
        else res.status(404).json({ message: 'This id does not exist.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/seats', (req, res) => {
    try {
        const { day, seat, client, email } = req.body;
        if(day && seat && client && email) {
            db.seats.push({ id: uuid, day, seat, client, email });
            res.json({ message: 'OK' });
        } else res.status(400).json({ message: 'All params are required.'});
    } catch(error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.put('/seats/:id', (req, res) => {
    try {
        const { day, seat, client, email } = req.body;
        const dataToEdit = db.seats.find(data => data.id == dataToEdit);
        if(dataToEdit) {
            dataToEdit.day = day;
            dataToEdit.seat = seat;
            dataToEdit.client = client;
            dataToEdit.email = email;
            res.json( { message: 'OK' });
        }
    } catch(error){
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.delete('/seats/:id', (req, res) => {
    try {
        const dataToRemove = db.seats.find(data => data.id == req.params.id);
        if(dataToRemove){
            const dataToRemoveIndex = db.seats.indexOf(dataToRemove);
            db.seats.splice(dataToRemoveIndex, 1);
            res.json({ message: 'OK' });
        } else {
            res.status(404).json({ message: 'This id does not exist...' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error'});
    }
})

app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000')
});