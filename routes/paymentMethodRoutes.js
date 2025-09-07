const express = require("express");
const router = express.Router();
const {
  addPaymentMethod,
  getUserPaymentMethods,
  updatePaymentMethod,
  deletePaymentMethod,
} = require("../controllers/paymentMethodContoller");

// Add new payment method
router.post("/", addPaymentMethod);

// Get all payment methods for a user
router.get("/:userId", getUserPaymentMethods);

// Update a payment method
router.put("/:paymentMethodId", updatePaymentMethod);

// Delete a payment method
router.delete("/:paymentMethodId", deletePaymentMethod);

module.exports = router;
