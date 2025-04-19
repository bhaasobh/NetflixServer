const express = require('express');
const router = express.Router();
const {
  addProfile,
  deleteProfile,
  getProfiles,
  editProfile,
  getProfilebyid
} = require('../controllers/userController');



router.post('/profiles/:userId', addProfile);
router.delete('/profiles/:userId/:profileId', deleteProfile);
router.get('/profiles/:userId', getProfiles);
router.put('/profiles/:userId/:profileId', editProfile);
router.get('/profiles/:userId/:profileId',getProfilebyid);

module.exports = router;
