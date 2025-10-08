const { v4: uuidv4 } = require("uuid");

function createVehicle(data) {
  return {
    vehicleId: uuidv4(),
    userId: data.userId,
    model: data.model,
    numberPlate: data.numberPlate,
    type: data.vehicleType,
    ownerName: data.ownerName,
    yearOfRegistration: data.yearOfRegistration,
    vehicleImageUrl: data.vehicleImageUrl,
    make: data.make || "",
    seatsAvailable: data.seatsAvailable || 1,
    isInsured: data.isInsured || false,
    rcBookUrl: data.rcBookUrl || null,
    insuranceUrl: data.insuranceUrl || null,
    createdAt: new Date().toISOString(),
  };
}

module.exports = { createVehicle };
