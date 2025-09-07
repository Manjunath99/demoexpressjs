const express = require("express");
const {
  addUserReview,
  getUserReviews,
  updateUserReview,
  deleteUserReview,
  getUserRating,
} = require("../controllers/reviewAndRatingController");
const { validateToken } = require("../middleware/validtaeTokenHandler");

const router = express.Router();

router.use(validateToken);

router.post("/reviews", addUserReview);

router.get("/reviews/:userId", getUserReviews);

router.put("/reviews/:userId/:reviewDate", updateUserReview);

router.delete("/reviews/:userId/:reviewDate", deleteUserReview);

router.get("/ratings/:userId", getUserRating);

module.exports = router;
