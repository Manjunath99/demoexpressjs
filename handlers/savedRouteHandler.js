const severless = require("serverless-http");
const savedRouteApp = require("../app/savedRouteApp");

module.exports.handler = severless(savedRouteApp);
