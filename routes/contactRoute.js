const express = require("express");
const router = express.Router();
const { validateToken } = require("../middleware/validtaeTokenHandler");

const {
  getContacts,
  getSingleContact,
  createContact,
  deleteContact,
  updateContact,
} = require("../controllers/contactController");

router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router
  .route("/:id")
  .get(getSingleContact)
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;
