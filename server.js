const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// TEST ROUTER FOR VIEWING A TOKEN, NOT NEEDED IN 
// YOUR REAL APP
const testRouter = require('./controllers/test-jwt')
// ===============================================
const authRouter = require('./controllers/auth')


app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Routes go here
// ==============================
// This is just for testing purposes
// to view a token!
app.use('/test-jwt', testRouter)
// ==============================
// ==============================
// THiS is needed for your REAL APP
app.use('/auth', authRouter)



app.listen(3000, () => {
  console.log('The express app is ready!');
});
