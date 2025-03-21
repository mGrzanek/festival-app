const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.listen(8000, () => {
    console.log('Server is running on port: 8000')
});