const { v4: uuidv4 } = require("uuid");

function createEmergencyContact({ userId, name, phoneNumber, relationship }) {
  return {
    userId,
    contactId: uuidv4(),
    name,
    phoneNumber,
    relationship,
    createdAt: new Date().toISOString(),
  };
}

module.exports = { createEmergencyContact };
