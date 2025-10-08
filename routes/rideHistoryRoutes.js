const express = require("express");
const {
  addRide,
  getRideById,
  getRidesByUser,
  updateRide,
  deleteRide,
} = require("../controllers/rideHistoryController");
const { validateToken } = require("../middleware/validtaeTokenHandler");

const router = express.Router();
router.use(validateToken); // Apply token validation middleware to all routes

/* -------------------- Ride History Routes -------------------- */

router.post("/", addRide); // Add new ride
router.get("/:rideId", getRideById); // Get ride by ID
router.get("/user/:userId", getRidesByUser); // Get all rides for a user
router.put("/:rideId", updateRide); // Update ride
router.delete("/:rideId", deleteRide); // Delete ride

module.exports = router;
