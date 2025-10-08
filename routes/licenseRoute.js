// routes/licenseRoutes.js
const express = require("express");
const router = express.Router();
const { validateToken } = require("../middleware/validtaeTokenHandler");

const {
  addLicenseController,
  getUserLicensesController,
  getLicenseController,
  updateLicenseController,
  deleteLicenseController,
} = require("../controllers/licenseController");

// Apply token validation middleware to all routes
router.use(validateToken);

// Routes
router.post("/", addLicenseController);
router.get("/user/:userId", getUserLicensesController);
router.get("/:licenseId", getLicenseController);
router.put("/:licenseId", updateLicenseController);
router.delete("/:licenseId", deleteLicenseController);

module.exports = router;
