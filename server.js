const express = require('express');
const socket = require('socket.io');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const concertRouter = require('./routes/concerts.routes');
const seatsRouter = require('./routes/seats.routes');
const testimonialsRouter = require('./routes/testimonials.routes');

const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
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

mongoose.connect('mongodb+srv://grzanekmonika:YLIlGF8h0IWxd9jg@clustermonika.qjhod0w.mongodb.net/NewWaveDB?retryWrites=true&w=majority&appName=ClusterMonika', { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));