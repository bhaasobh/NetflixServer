const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ➕ יצירת פרופיל חדש
router.post('/profiles/:userId', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Profile name is required' });
    }

    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.profiles.length >= 5) {
      return res.status(400).json({ message: 'You can only have up to 5 profiles' });
    }

    user.profiles.push({ name: name.trim() });
    await user.save();

    res.status(201).json(user.profiles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while adding profile' });
  }
});

router.delete('/profiles/:userId/:profileId', async (req, res) => {
    try {
      const { userId, profileId } = req.params;
  
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const initialLength = user.profiles.length;
  
      user.profiles = user.profiles.filter(
        (profile) => profile._id.toString() !== profileId
      );
  
      if (user.profiles.length === initialLength) {
        return res.status(404).json({ message: 'Profile not found' });
      }
  
      await user.save();
      res.status(200).json(user.profiles);
    } catch (err) {
      console.error('Error deleting profile:', err);
      res.status(500).json({ message: 'Server error while deleting profile' });
    }
  });
  

// 📥 קבלת כל הפרופילים
router.get('/profiles/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user.profiles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching profiles' });
  }
});

  
  module.exports = router;