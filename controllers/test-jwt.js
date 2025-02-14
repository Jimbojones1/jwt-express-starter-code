// controllers/test-jwt.js

// THIS FILE IS A DEMO OF CREATING A JWT in order to view it
// STRICTLY FOR TESTING PURPOSES
const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken')

router.get('/sign-token', (req, res) => {

  const badPayload = {
    _id: 1,
    username: 'test user',
    password: 'test'
  }

  const token = jwt.sign({badPayload}, process.env.JWT_SECRET)


  res.json({ token });
});

module.exports = router;
