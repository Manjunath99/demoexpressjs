const express = require("express");
const router = express.Router();

const { validateToken } = require("../middleware/validtaeTokenHandler");

const {
  register,
  login,
  currentUser,
  updateUser,
} = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);

router.post("/update", validateToken, updateUser);

router.get("/current", validateToken, currentUser);

module.exports = router;
