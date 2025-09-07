const express = require("express");
const router = express.Router();
const {
  upsertAuthDetails,
  getAuthDetails,
} = require("../controllers/authController");

// Create or update authentication details
router.post("/", upsertAuthDetails);

// Get authentication details for a user (without password hash)
router.get("/:userId", getAuthDetails);

module.exports = router;
