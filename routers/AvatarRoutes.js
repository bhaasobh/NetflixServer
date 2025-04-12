const express = require('express');
const router = express.Router();
const { addAvatar, getAvatarByNumber } = require('../controllers/avatarController');

router.post('/', addAvatar);
router.get('/:number', getAvatarByNumber);

module.exports = router;
