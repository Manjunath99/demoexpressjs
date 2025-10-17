const serverless = require("serverless-http");
const emergencyContactApp = require("../app/emergencyContactApp");

module.exports.handler = serverless(emergencyContactApp);
