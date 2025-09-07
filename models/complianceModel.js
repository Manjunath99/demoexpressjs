// models/complianceModel.js
function createUserCompliance(data) {
  return {
    userId: data.userId,
    termsAndConditionsAccepted: data.termsAndConditionsAccepted ?? false,
    termsAcceptanceDate: data.termsAcceptanceDate || null,
    backgroundCheckPassed: data.backgroundCheckPassed ?? false,
    isVerified: data.isVerified ?? false,
    updatedAt: new Date().toISOString(),
  };
}

module.exports = { createUserCompliance };
