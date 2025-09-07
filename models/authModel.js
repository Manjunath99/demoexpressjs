const { v4: uuidv4 } = require("uuid");

function createAuthenticationDetails(data) {
  return {
    authId: uuidv4(),
    userId: data.userId,
    passwordHash: data.passwordHash || null,
    oauthTokens: data.oauthTokens || {}, // e.g., { google: "token", facebook: "token" }
    isEmailVerified: data.isEmailVerified || false,
    isPhoneVerified: data.isPhoneVerified || false,
    recoveryEmail: data.recoveryEmail || null,
    recoveryPhone: data.recoveryPhone || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

module.exports = { createAuthenticationDetails };
