const mongoose = require('mongoose');

const AvatarSchema = new mongoose.Schema({
  number:{type: Number} ,
  url:{type:String}
}
);

const Avatar = mongoose.model('Avatar', AvatarSchema);

module.exports = Avatar;
