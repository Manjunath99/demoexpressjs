const { v4: uuidv4 } = require("uuid");

// Factory to create a new UserReview object

function createUserReview(data) {
  return {
    reviewId: uuidv4(),
    userId: data.userId,
    reviewerId: data.reviewerId,
    ratingGiven: data.ratingGiven,
    reviewText: data.reviewText || "", // default to empty string
    reviewDate: new Date().toISOString(),
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
