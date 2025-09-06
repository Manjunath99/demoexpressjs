// models/vehicleModel.js
const { v4: uuidv4 } = require("uuid");

function createVehicle(data) {
  return {
    vehicleId: uuidv4(), // unique vehicle ID
    userId: data.userId,
    make: data.make,
    model: data.model,
    year: data.year,
    licensePlate: data.licensePlate,
    color: data.color,
    vehicleType: data.vehicleType,
    isInsured: data.isInsured || false,
    createdAt: new Date().toISOString(),
  };
}

module.exports = { createVehicle };
