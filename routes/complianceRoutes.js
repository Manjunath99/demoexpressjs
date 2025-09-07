// routes/complianceRoutes.js
const express = require("express");
const {
  upsertCompliance,
  getCompliance,
  deleteCompliance,
} = require("../controllers/complianceController");

const router = express.Router();

// Add or update compliance
router.post("/", upsertCompliance);

// Get compliance by userId
router.get("/:userId", getCompliance);

// Delete compliance
router.delete("/:userId", deleteCompliance);

module.exports = router;
