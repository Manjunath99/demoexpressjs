const { v4: uuidv4 } = require("uuid");

function createRideHistory(data) {
  return {
    rideId: data.rideId || uuidv4(),
    rideDate: data.rideDate || new Date().toISOString(),
    driverId: data.driverId,
    passengerId: data.passengerId,
    rideStatus: data.rideStatus || "Pending",
    pickUpLocation: data.pickUpLocation,
    dropOffLocation: data.dropOffLocation,
    rideFare: data.rideFare || 0,
    rideType: data.rideType || "Standard",
    rating: data.rating || null,
    paymentMethod: data.paymentMethod || "Cash",
  };
}

module.exports = { createRideHistory };
