// routes/vehicleRoutes.js
const express = require("express");
const router = express.Router();
const { validateToken } = require("../middleware/validateTokenHandler");
const {
  addVehicleController,
  getUserVehiclesController,
  getVehicleController,
  updateVehicleController,
  deleteVehicleController,
} = require("../controllers/vehicleController");

router.use(validateToken);

router.post("/", addVehicleController);
router.get("/user/:userId", getUserVehiclesController);
router.get("/:vehicleId", getVehicleController);
router.put("/:vehicleId", updateVehicleController);
router.delete("/:vehicleId", deleteVehicleController);

module.exports = router;
