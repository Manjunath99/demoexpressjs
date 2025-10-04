const { v4: uuidv4 } = require("uuid");

function createUser(data) {
  return {
    userId: uuidv4(),
    firstName: data.firstName || "",
    lastName: data.lastName || "",
    email: data.email || "",
    phoneNumber: data.phoneNumber,
    profilePictureUrl: data.profilePictureUrl || null,
    gender: data.gender || null,
    dateOfBirth: data.dateOfBirth || null,
    languagePreference: data.languagePreference || "en",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),

    // Authentication & security
    passwordHash: data.passwordHash,
    oauthToken: data.oauthToken || null,
    isEmailVerified: data.isEmailVerified || false,
    isPhoneVerified: data.isPhoneVerified || false,

    // Homepage flags
    isSubscribed: data.isSubscribed || false,
    planName: data.planName || null,
    isVerified: data.isVerified || false,
    hasVehicle: data.hasVehicle || false,
    currentLocationId: data.currentLocationId || null,

    // Ride preferences
    preferQuietRide: data.preferQuietRide || false,
    preferACOn: data.preferACOn || true,
    rideTypePreference: data.rideTypePreference || "Standard",
    shareRide: data.shareRide || false,
    paymentPreference: data.paymentPreference || "Wallet",
  };
}

module.exports = { createUser };
