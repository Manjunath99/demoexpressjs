// routes/subscriptionRoutes.js
const express = require("express");
const {
  addSubscription,
  updateSubscription,
  cancelSubscription,
  getActiveSubscription,
} = require("../controllers/subscriptionController");

const router = express.Router();

// Add a new subscription
router.post("/", addSubscription);

// Update an existing subscription (plan change, etc.)
router.put("/", updateSubscription);

// Cancel a subscription
router.delete("/", cancelSubscription);

// Get the active subscription for a user
router.get("/:userId", getActiveSubscription);

module.exports = router;
