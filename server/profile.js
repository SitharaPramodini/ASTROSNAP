const express = require('express');
const router = express.Router();
const User = require('./models/User.model.js');

// Get user profile
router.get('/', async (req, res) => {
  try {
    // Assuming you have implemented user authentication and have access to user details from the request
    const user = req.user;
    res.json(user); // Return user details
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
