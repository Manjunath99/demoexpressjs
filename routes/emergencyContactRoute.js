// routes/emergencyContactRoutes.js
const express = require("express");
const router = express.Router();
const { validateToken } = require("../middleware/validtaeTokenHandler");

const {
  addEmergencyContact,
  getEmergencyContacts,
  updateEmergencyContact,
  deleteEmergencyContact,
} = require("../controllers/emergencyContactController");

router.post("/:userId", validateToken, addEmergencyContact);

router.get("/:userId", validateToken, getEmergencyContacts);

router.put("/:userId/:contactId", validateToken, updateEmergencyContact);

router.delete("/:userId/:contactId", validateToken, deleteEmergencyContact);

module.exports = router;
