const { v4: uuidv4 } = require("uuid");

function createUserSubscription(data) {
  return {
    subscriptionId: uuidv4(), // unique subscription ID
    userId: data.userId,
    planName: data.planName,
    startDate: data.startDate || new Date().toISOString(),
    endDate: data.endDate || null,
    isActive: data.isActive ?? true, // default active
    costPerMonth: data.costPerMonth || 0,
    createdAt: new Date().toISOString(),
  };
}

module.exports = { createUserSubscription };
