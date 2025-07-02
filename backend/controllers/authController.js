 import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Register
export const registerUser = async (req, res) => {
  console.log(" Register Request:", req.body);

  try {
    const { name, email, password, phone } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    // Include isPaid in the token
    const token = jwt.sign(
      { id: newUser._id, isPaid: newUser.isPaid },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log("User registered:", newUser);

    res.status(201).json({ message: 'User registered', token });
  } catch (error) {
    console.error(" Register Error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Include isPaid in the token
    const token = jwt.sign(
      { id: user._id, isPaid: user.isPaid },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(" Login Error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};
