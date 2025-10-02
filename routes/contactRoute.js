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

//router.use(validateToken);
router.route("/api/contacts/").get(getContacts).post(createContact);
router
  .route("/api/contacts/:id")
  .get(getSingleContact)
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;
//   .route("/:id")
// const express = require("express");
// const router = express.Router();

// // Import controller
// const { getContacts } = require("../controllers/contactController");

// // For now, static JSON
// router.get("/", getContacts);
// router.get("/api/contacts", getContacts);

// module.exports = router;
