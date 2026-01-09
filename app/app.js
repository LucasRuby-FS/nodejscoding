const express = require('express');
const app = express();
const router = require('./routes');

app.use(express.json());

app.get('/', (req,res) => {
res.status(200).json({ message: 'Service is up!'})
});
//routes
app.use('/api', router); 

app.use((req,res,next) => {
//next for errors
const error = new Error('Not Found');
error.status = 404;
next(error);
});

app.use((err,req,res,next) => {
res.status(err.status || 500).json({message: err.message, status: err.status})
});

module.exports = app;