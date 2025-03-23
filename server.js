const express = require('express');
const app = express();
const cors = require('cors');
const concertRouter = require('./routes/concerts.routes');
const seatsRouter = require('./routes/seats.routes');
const testimonialsRouter = require('./routes/testimonials.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/api', concertRouter);
app.use('/api', seatsRouter);
app.use('/api', testimonialsRouter);
app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000')
});