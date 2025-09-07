// routes/vehicleRoutes.js
const express = require("express");
const router = express.Router();
const { validateToken } = require("../middleware/validtaeTokenHandler");
const {
  addVehicleController,
  getUserVehiclesController,
  getVehicleController,
  updateVehicleController,
  deleteVehicleController,
} = require("../controllers/vechileController");

router.use(validateToken);

router.post("/", addVehicleController);
router.get("/user/:userId", getUserVehiclesController);
router.get("/:vehicleId", getVehicleController);
router.put("/:vehicleId", updateVehicleController);
router.delete("/:vehicleId", deleteVehicleController);

module.exports = router;
