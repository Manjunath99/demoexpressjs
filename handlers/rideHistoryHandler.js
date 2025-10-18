const severless = require("serverless-http");
const rideHistoryApp = require("../app/rideHistoryApp");

module.exports.handler = severless(rideHistoryApp);
