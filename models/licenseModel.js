const { v4: uuidv4 } = require("uuid");

function createLicense(data) {
  return {
    licenseId: uuidv4(),
    userId: data.userId,
    licenseNumber: data.licenseNumber,
    expiryDate: data.expiryDate,
    frontImageUrl: data.frontImageUrl,
    backImageUrl: data.backImageUrl,
    selfieImageUrl: data.selfieImageUrl,
    status: data.status || "pending",
    createdAt: new Date().toISOString(),
  };
}

module.exports = { createLicense };
