const { v4: uuidv4 } = require("uuid");

function createSavedRoute(data) {
  return {
    routeId: data.routeId || uuidv4(),
    userId: data.userId,
    routeName: data.routeName || "",
    startLocation: data.startLocation || {
      // Mandatory
      latitude: 0,
      longitude: 0,
      address: "",
    },
    endLocation: data.endLocation || {
      // Mandatory
      latitude: 0,
      longitude: 0,
      address: "",
    },
    waypoints: data.waypoints || [],
    createdAt: data.createdAt || new Date().toISOString(),
    lastUsed: data.lastUsed || null,
    notes: data.notes || "",
    preferredVehicleType: data.preferredVehicleType || "Standard",
    shareRide: data.shareRide || false,
  };
}

module.exports = { createSavedRoute };
