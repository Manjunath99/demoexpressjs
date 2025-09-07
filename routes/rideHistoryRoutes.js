const express = require("express");
const {
  addRide,
  getRideById,
  getRidesByUser,
  updateRide,
  deleteRide,
} = require("../controllers/rideHistoryController");

const router = express.Router();

router.post("/", addRide); // Add new ride
router.get("/:rideId", getRideById); // Get ride by ID
router.get("/user/:userId", getRidesByUser); // Get all rides for a user
router.put("/:rideId", updateRide); // Update ride
router.delete("/:rideId", deleteRide); // Delete ride

module.exports = router;
