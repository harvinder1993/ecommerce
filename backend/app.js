const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const errorMiddleware  = require('./middleware/error')


app.use(express.json())
app.use(cookieParser());

// Import Routes
const product = require('./routes/product');
const user = require('./routes/user');

app.use('/api/v1',product);
app.use('/api/v1',user);

//Middleware for errors
app.use(errorMiddleware)

module.exports = app