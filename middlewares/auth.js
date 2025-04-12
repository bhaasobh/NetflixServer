const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      role,
      profiles: []
    });

    await newUser.save();

    res.status(200).json({ message: 'Signup successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password, rememberMe } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: '1h' } // טוקן תקף לשעה
    );

    // שמירת ה-token ב-cookie אם המשתמש ביקש "Remember Me"
    if (rememberMe) {
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000, // שעה אחת
        sameSite: 'Strict', // לפי הצורך
        secure: process.env.NODE_ENV === 'production' // רק HTTPS בפרודקשן
        
      });
    }

    // מחזירים גם ב-JSON אם הלקוח שומר אותו ב-Context/LocalStorage
    res.status(200).json({
      message: 'Login successful',
      token,
      email: user.email,
      role: user.role,
      id: user._id,
      profiles: user.profiles
    });

    console.log("✅ Signin successful");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
