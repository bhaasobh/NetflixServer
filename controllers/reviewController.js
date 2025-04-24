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


// GET last 10 reviewed media items by a user
exports.getRecentReviews = async (req, res) => {
  try {
    const { userId } = req.params;

    const reviews = await Review.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json(reviews);
  } catch (err) {
    console.error('Failed to fetch user reviews:', err);
    res.status(500).json({ message: 'Error retrieving reviews', error: err.message });
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
