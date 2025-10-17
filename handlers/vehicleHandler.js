const serverless = require("serverless-http");
const vehicleApp = require("../app/vehicleApp");

module.exports.handler = serverless(vehicleApp);
