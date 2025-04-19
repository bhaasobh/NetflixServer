const Review = require('../models/Review');

exports.createReview = async (req, res) => {
  try {
    const { userId, mediaId, text, isPublic, rating } = req.body;

    const review = new Review({
      userId,
      mediaId,
      text,
      isPublic,
      rating,
    });

    await review.save();
    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'error creating the review' });
  }
};

exports.getPublicReviews = async (req, res) => {
  try {
    const { mediaId } = req.params;
    const reviews = await Review.find({ mediaId, isPublic: true }).populate('userId', 'username');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'error getting the review' });
  }
};

exports.getUserReviews = async (req, res) => {
  try {
    const { userId } = req.params;
    const reviews = await Review.find({ userId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'error getting the review' });
  }
};
