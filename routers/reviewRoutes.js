const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');


router.post('/', reviewController.createReview);
router.get('/public/:mediaId', reviewController.getPublicReviews);
router.get('/user/:userId', reviewController.getUserReviews);


module.exports = router;
