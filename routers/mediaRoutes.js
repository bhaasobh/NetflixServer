const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');

router.post('/add-media', mediaController.addMedia);
router.delete('/delete-media/:id', mediaController.deleteMedia);
router.get('/media', mediaController.getAllMedia);


module.exports = router;
