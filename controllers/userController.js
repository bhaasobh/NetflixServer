const User = require('../models/User');


const addProfile = async (req, res) => {
  try {
    const { name, profilePhoto, profileNumber } = req.body;
    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Profile name is required' });
    }

    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.profiles.length >= 5) {
      return res.status(400).json({ message: 'You can only have up to 5 profiles' });
    }

    const usedNumbers = user.profiles.map(p => p.profileNumber);
    if (usedNumbers.includes(profileNumber)) {
      return res.status(400).json({ message: 'Profile number already in use' });
    }

    user.profiles.push({ name: name.trim(), profilePhoto, profileNumber });
    await user.save();

    res.status(201).json(user.profiles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while adding profile' });
  }
};


const deleteProfile = async (req, res) => {
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
};


const getProfiles = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user.profiles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching profiles' });
  }
};

const getProfilebyid = async (req, res) => {
  try {
    const { profileId } = req.params;

    // Find user who has this profile
    const user = await User.findOne({ 'profiles._id': profileId });

    if (!user) return res.status(404).json({ message: 'Profile not found' });

    const profile = user.profiles.id(profileId); // Mongoose subdoc access
    res.json(profile);
  } catch (err) {
    console.error('Error fetching profile by ID:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const editProfile = async (req, res) => {
  try {
    const { userId, profileId } = req.params;
    const { name } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Profile name is required' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const profile = user.profiles.id(profileId);
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    profile.name = name.trim();
    await user.save();

    res.status(200).json(user.profiles);
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Server error while updating profile' });
  }
};

module.exports = {
  addProfile,
  deleteProfile,
  getProfiles,
  editProfile,
  getProfilebyid
};
