// models/locationModel.js
const { v4: uuidv4 } = require("uuid");

function createUserLocation(data) {
  return {
    locationId: uuidv4(),
    userId: data.userId,
    latitude: data.latitude,
    longitude: data.longitude,
    address: data.address,
    locationType: data.locationType || "Other", // e.g., Home, Office
    isActiveAddress: data.isActiveAddress ?? false,
    createdAt: new Date().toISOString(),
  };
}

module.exports = { createUserLocation };
