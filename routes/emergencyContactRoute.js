// routes/emergencyContactRoutes.js
const express = require("express");
const router = express.Router();
const {
  addEmergencyContact,
  getEmergencyContacts,
  updateEmergencyContact,
  deleteEmergencyContact,
} = require("../controllers/emergencyContactController");

router.post("/:userId", addEmergencyContact);

router.get("/:userId", getEmergencyContacts);

router.put("/:userId/:contactId", updateEmergencyContact);

router.delete("/:userId/:contactId", deleteEmergencyContact);

module.exports = router;
