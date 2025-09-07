const { v4: uuidv4 } = require("uuid");

function createEmergencyContact({ userId, name, phoneNumber, relationship }) {
  return {
    userId, // Partition Key
    contactId: uuidv4(), // Sort Key (unique per contact)
    name,
    phoneNumber,
    relationship,
    createdAt: new Date().toISOString(),
  };
}

module.exports = { createEmergencyContact };
