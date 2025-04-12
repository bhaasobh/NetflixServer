const Avatar = require('../models/avatar');


// Get avatar by number
const getAvatarByNumber = async (req, res) => {
  try {
    const { number } = req.params;
    console.log(number);
    const avatar = await Avatar.findOne({ number: number});
    if (!avatar) {
      return res.status(404).json({ message: 'Avatar not found' });
    }

    res.status(200).json(avatar);
  } catch (err) {
    console.error('Error fetching avatar by number:', err);
    res.status(500).json({ message: 'Server error while fetching avatar' });
  }
};

const addAvatar = async (req, res) => {
  try {
    const { number, url } = req.body;

    if (!number || !url) {
      return res.status(400).json({ message: 'Number and URL are required' });
    }

    const existing = await Avatar.findOne({ number });
    if (existing) {
      return res.status(400).json({ message: 'Avatar with this number already exists' });
    }

    const avatar = new Avatar({
      name: `Avatar ${number}`, // optional, or allow from req.body
      number,
      url,
    });

    await avatar.save();
    res.status(201).json(avatar);
  } catch (err) {
    console.error('Error adding avatar:', err);
    res.status(500).json({ message: 'Server error while adding avatar' });
  }
};

module.exports = {
  addAvatar,
  getAvatarByNumber
};
