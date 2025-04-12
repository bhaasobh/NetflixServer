const mongoose = require('mongoose');



const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profilePhoto: { type: Number, min: 1, max: 5, required: true }
});


const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  profiles: {
    type: [profileSchema],
    validate: [val => val.length <= 5, 'You can have up to 5 profiles only'],
    default: [] // חשוב כדי להתחיל עם מערך ריק
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
