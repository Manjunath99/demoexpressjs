// models/communicationModel.js
function createUserCommunication(data) {
  return {
    userId: data.userId,
    receivePromotionalNotifications:
      data.receivePromotionalNotifications ?? true,
    receiveRideUpdates: data.receiveRideUpdates ?? true,
    receiveSafetyAlerts: data.receiveSafetyAlerts ?? true,
    updatedAt: new Date().toISOString(),
  };
}

module.exports = { createUserCommunication };
