const severless = require("serverless-http");
const licenseApp = require("../app/licenseApp");
module.exports.handler = severless(licenseApp);
