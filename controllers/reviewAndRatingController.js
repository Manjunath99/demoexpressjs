const AWS = require("aws-sdk");
const asyncHandler = require("express-async-handler");
const { createUserReview } = require("../models/userReviewModel");
const dynamodb = require("../config/dynamoDbConnection");
const RATING_TABLE = "UserRating";
const REVIEW_TABLE = "UserReview";

/* -------------------- Add Review + Incremental Rating -------------------- */
const addUserReview = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.userId) {
    res.status(401);
    throw new Error("Unauthorized: No user information found");
  }
  const { ratingGiven, reviewerId, userId } = req.body;

  if (
    !ratingGiven ||
    ratingGiven < 0 ||
    ratingGiven > 5 ||
    !reviewerId ||
    !userId
  ) {
    res.status(400);
    throw new Error("Invalid rating");
  }
  const reviewItem = createUserReview(req.body);

  await dynamodb
    .put({
      TableName: REVIEW_TABLE,
      Item: reviewItem,
    })
    .promise();

  const ratingResult = await dynamodb
    .get({
      TableName: RATING_TABLE,
      Key: { userId: reviewItem.userId },
    })
    .promise();

  let averageRating, numberOfRatings;

  if (ratingResult.Item) {
    numberOfRatings = ratingResult.Item.numberOfRatings + 1;
    averageRating =
      (ratingResult.Item.averageRating * ratingResult.Item.numberOfRatings +
        reviewItem.ratingGiven) /
      numberOfRatings;
  } else {
    numberOfRatings = 1;
    averageRating = reviewItem.ratingGiven;
  }

  // Save updated rating
  await dynamodb
    .put({
      TableName: RATING_TABLE,
      Item: { userId: reviewItem.userId, averageRating, numberOfRatings },
    })
    .promise();

  res.status(201).json({
    message: "Review added & rating updated",
    userId: reviewItem.userId,
    rating: { averageRating, numberOfRatings },
  });
});

/* -------------------- Get Reviews + Rating -------------------- */
const getUserReviews = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.userId) {
    res.status(401);
    throw new Error("Unauthorized: No user information found");
  }
  const { userId } = req.params;

  // Fetch reviews
  const reviewsResult = await dynamodb
    .query({
      TableName: REVIEW_TABLE,
      KeyConditionExpression: "userId = :uid",
      ExpressionAttributeValues: { ":uid": userId },
    })
    .promise();

  // Fetch rating
  const ratingResult = await dynamodb
    .get({
      TableName: RATING_TABLE,
      Key: { userId },
    })
    .promise();

  res.status(200).json({
    reviews: reviewsResult.Items || [],
    rating: ratingResult.Item || { averageRating: 0, numberOfRatings: 0 },
  });
});

/* -------------------- Update Review + Adjust Rating -------------------- */
const updateUserReview = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.userId) {
    res.status(401);
    throw new Error("Unauthorized: No user information found");
  }
  const { userId, reviewDate } = req.params;
  const { reviewText, ratingGiven, oldRating } = req.body;

  // Update review record
  await dynamodb
    .put({
      TableName: REVIEW_TABLE,
      Item: { userId, reviewDate, reviewText, ratingGiven }, // overwrite old review
    })
    .promise();

  // Get current rating
  const ratingResult = await dynamodb
    .get({
      TableName: RATING_TABLE,
      Key: { userId },
    })
    .promise();

  let averageRating = 0;
  let numberOfRatings = 0;

  if (ratingResult.Item) {
    numberOfRatings = ratingResult.Item.numberOfRatings;

    if (numberOfRatings > 0) {
      const totalBefore = ratingResult.Item.averageRating * numberOfRatings;
      const newTotal = totalBefore - oldRating + ratingGiven;
      averageRating = newTotal / numberOfRatings;
    }
  }

  // Save updated rating
  await dynamodb
    .put({
      TableName: RATING_TABLE,
      Item: { userId, averageRating, numberOfRatings },
    })
    .promise();

  res.status(200).json({
    message: "Review updated & rating adjusted",
    userId,
    rating: { averageRating, numberOfRatings },
  });
});

/* -------------------- Delete Review + Decremental Rating -------------------- */
const deleteUserReview = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.userId) {
    res.status(401);
    throw new Error("Unauthorized: No user information found");
  }
  const { userId, reviewDate } = req.params;
  const { ratingGiven } = req.body; // must pass rating being deleted

  // Delete review
  await dynamodb
    .delete({
      TableName: REVIEW_TABLE,
      Key: { userId, reviewDate },
    })
    .promise();

  // Get current rating
  const ratingResult = await dynamodb
    .get({
      TableName: RATING_TABLE,
      Key: { userId },
    })
    .promise();

  let averageRating = 0;
  let numberOfRatings = 0;

  if (ratingResult.Item) {
    numberOfRatings = ratingResult.Item.numberOfRatings - 1;

    if (numberOfRatings > 0) {
      const totalBefore =
        ratingResult.Item.averageRating * ratingResult.Item.numberOfRatings;
      const newTotal = totalBefore - ratingGiven;
      averageRating = newTotal / numberOfRatings;
    }
  }

  // Save updated rating
  await dynamodb
    .put({
      TableName: RATING_TABLE,
      Item: { userId, averageRating, numberOfRatings },
    })
    .promise();

  res.status(200).json({
    message: "Review deleted & rating updated",
    userId,
    rating: { averageRating, numberOfRatings },
  });
});

/* -------------------- Get Rating Only -------------------- */
const getUserRating = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.userId) {
    res.status(401);
    throw new Error("Unauthorized: No user information found");
  }
  const { userId } = req.params;

  const ratingResult = await dynamodb
    .get({
      TableName: RATING_TABLE,
      Key: { userId },
    })
    .promise();

  res
    .status(200)
    .json(ratingResult.Item || { averageRating: 0, numberOfRatings: 0 });
});

module.exports = {
  addUserReview,
  getUserReviews,
  updateUserReview,
  deleteUserReview,
  getUserRating,
};
