const { v4: uuidv4 } = require("uuid");

function createVehicle(data) {
  return {
    vehicleId: uuidv4(), // Unique vehicle ID
    userId: data.userId, // Owner ID
    make: data.make,
    model: data.model,
    color: data.color,
    numberPlate: data.numberPlate || data.licensePlate,
    type: data.type || data.vehicleType, // car, bike, etc.
    seatsAvailable: data.seatsAvailable || 4,
    yearOfRegistration: data.yearOfRegistration || data.year,
    isInsured: data.isInsured || false,
    vehicleImageUrl: data.vehicleImageUrl || null,
    rcBookUrl: data.rcBookUrl || null,
    insuranceUrl: data.insuranceUrl || null,
    createdAt: new Date().toISOString(),
  };
}

module.exports = { createVehicle };
