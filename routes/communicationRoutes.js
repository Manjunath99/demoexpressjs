const express = require("express");
const {
  upsertCommunication,
  getCommunication,
  deleteCommunication,
} = require("../controllers/communicationController");

const router = express.Router();

router.post("/", upsertCommunication);
router.get("/:userId", getCommunication);
router.delete("/:userId", deleteCommunication);

module.exports = router;
