const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.get('/:userId/profile/:profileId', async (req, res) => {
  const { userId, profileId } = req.params;
  try {
    const user = await User.findById(userId);
    const profile = user.profiles.id(profileId);
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile.myList);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/:userId/profile/:profileId', async (req, res) => {
    const { userId, profileId } = req.params;
    const movie = req.body;
    try {
      const user = await User.findById(userId);
      const profile = user.profiles.id(profileId);
      if (!profile) return res.status(404).json({ message: 'Profile not found' });
  
      const exists = profile.myList.some(m => m.id === movie.id);
      if (exists) {
        return res.json({ added: false, message: 'Movie already exists', myList: profile.myList });
      }
  
      profile.myList.push(movie);
      await user.save();
  
      res.json({ added: true, message: 'Movie added', myList: profile.myList });
    } catch (err) {
      res.status(500).json({ message: 'Error adding movie' });
    }
  });
  

router.delete('/:userId/profile/:profileId/:movieId', async (req, res) => {
  const { userId, profileId, movieId } = req.params;
  try {
    const user = await User.findById(userId);
    const profile = user.profiles.id(profileId);
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    profile.myList = profile.myList.filter(m => m.id !== Number(movieId));
    await user.save();

    res.json(profile.myList);
  } catch (err) {
    res.status(500).json({ message: 'Error removing movie' });
  }
});

module.exports = router;
