// models/Media.js
const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  media_type: { type: String, enum: ['movie', 'tv'], required: true },
  poster_path: { type: String },
  backdrop_path: { type: String },
  overview: { type: String },
  createdAt: { type: Date, default: Date.now },
  source: {type :String, default :'local'}
});

module.exports = mongoose.model('Media', mediaSchema);
