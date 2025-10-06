const express = require("express");
const router = express.Router();
const {
  autocomplete,
  geocode,
  getRoute,
} = require("../controllers/olaMapsController");

// Autocomplete place search
router.get("/autocomplete", autocomplete);

// Reverse geocode lat/lng → address
router.get("/geocode", geocode);

// Get driving route
router.post("/route", getRoute);

module.exports = router;
