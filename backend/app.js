const express = require('express');
const app = express();
const errorMiddleware  = require('./middleware/error')


app.use(express.json())

// Import Routes
const product = require('./routes/product');

app.use('/api/v1',product);

//Middleware for errors
app.use(errorMiddleware)

module.exports = app