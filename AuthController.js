const bcrypt = require('bcrypt');
const User = require('../Models/User');


/**
 * Signup Controller
 */
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Exclude password from the response
    const userResponse = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email
    };

    res.status(201).json({ message: 'User created successfully', user: userResponse });
  } catch (err) {
    console.error('Signup Error:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Login Controller
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(403).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({ message: 'Invalid email or password' });
    }

    // Exclude password from response
    const userResponse = {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email
    };

    res.status(200).json({ message: 'Login successful', user: userResponse });
  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { signup, login };
