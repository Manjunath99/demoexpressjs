const { v4: uuidv4 } = require("uuid");

const createPaymentMethod = (data) => {
  return {
    paymentMethodId: uuidv4(),
    userId: data.userId,
    paymentType: data.paymentType, // Card, Wallet, UPI, Cash
    cardNumber: data.cardNumber || null, // masked card or wallet id
    expirationDate: data.expirationDate || null,
    billingAddress: data.billingAddress || null,
    paymentProvider: data.paymentProvider || null, // Visa, Stripe, PhonePe, etc.
    createdAt: new Date().toISOString(),
  };
};

module.exports = { createPaymentMethod };
