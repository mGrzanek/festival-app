const express = require('express');
const socket = require('socket.io');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const concertRouter = require('./routes/concerts.routes');
const seatsRouter = require('./routes/seats.routes');
const testimonialsRouter = require('./routes/testimonials.routes');

const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if(NODE_ENV === 'production') dbUri = process.env.MONGODB_URI;
else if(NODE_ENV === 'test') dbUri = process.env.MONGODB_URI_TEST;
else dbUri = process.env.MONGODB_URI_LOCAL;


const server = app.listen(process.env.PORT || 8000, () => {
    if(NODE_ENV !== 'test' ) console.log('Server is running...');
});

const io = socket(server);
io.on('connection', (socket) => {
    console.log('New socket!');
});

app.use(helmet());
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    req.io = io;
    next();
  });
app.use('/api', concertRouter);
app.use('/api', seatsRouter);
app.use('/api', testimonialsRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
});

mongoose.connect(dbUri, { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

module.exports = server;