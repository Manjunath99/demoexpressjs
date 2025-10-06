// routes/savedRouteRoutes.js
const express = require("express");
const router = express.Router();
const { validateToken } = require("../middleware/validtaeTokenHandler");

const {
  addSavedRoute,
  getSavedRoutes,
  updateSavedRoute,
  deleteSavedRoute,
} = require("../controllers/savedRouteController");

router.post("/:userId", validateToken, addSavedRoute);

router.get("/:userId", validateToken, getSavedRoutes);

router.put("/:userId/:routeId", validateToken, updateSavedRoute);

router.delete("/:userId/:routeId", validateToken, deleteSavedRoute);

module.exports = router;
