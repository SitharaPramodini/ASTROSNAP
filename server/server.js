// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors'); // Import the cors package
const User = require('./models/User.model.js');

const jwt = require('jsonwebtoken');
// const secretKey = 'user-key-086'; // Change this to a secure secret key
const crypto = require('crypto');
// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');
console.log('Generated secret key:', secretKey);


const app = express();
app.use(cors(
  {
    origin: ["https://localhost:3000", "https://mern-task-app.onrender.com"],
  }
));
app.use(express.json())

const PORT = process.env.PORT || 5000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/astrosnap', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Signup route
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({ success: true , message: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// Signin route
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Sign-in successful, generate token
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });

    res.json({ success: true, message: 'Login successful', token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



// get user
// In your server.js
app.get('/user', async (req, res) => {
  try {
    // Assuming you have implemented user authentication and have access to user details from the request
    const user = req.user;
    res.json(user); // Return user details
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


//profile
app.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Retrieve user details using user ID from token
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user); // Return user details
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error('JWT verification error:', err);
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
      } else if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
      } else {
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
    req.user = decoded;
    next();
  });
}


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));