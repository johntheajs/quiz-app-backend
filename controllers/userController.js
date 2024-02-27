const admin = require('../config');
const User = require('../models/users');


exports.signup = async (req, res) => {
  try {
    const { name, email, password, reg, role } = req.body;
    const newUser = new User(name, email, password, reg, role);
    const userId = await newUser.save();
    res.status(201).json({ message: "User registered with ID: " + userId });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: "An error occurred while registering user" });
  }
};

