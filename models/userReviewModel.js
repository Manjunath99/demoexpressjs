const { v4: uuidv4 } = require("uuid");

// Factory to create a new UserReview object
function createUserReview({ userId, reviewText, reviewerId, ratingGiven }) {
  return {
    userId,
    reviewId: uuidv4(), // unique reviewId instead of relying only on reviewDate
    reviewText,
    reviewerId,
    reviewDate: new Date().toISOString(), // consistent ISO timestamp
    ratingGiven,
  };
}

// Factory to create or update UserRating object
function createUserRating(userId, reviews) {
  const numberOfRatings = reviews.length;
  const averageRating =
    numberOfRatings === 0
      ? 0
      : reviews.reduce((sum, r) => sum + r.ratingGiven, 0) / numberOfRatings;

  return {
    userId,
    averageRating: parseFloat(averageRating.toFixed(2)),
    numberOfRatings,
  };
}

module.exports = {
  createUserReview,
  createUserRating,
};
