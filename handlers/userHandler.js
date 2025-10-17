const serverless = require("serverless-http");
const userApp = require("../app/userApp");

module.exports.handler = serverless(userApp);
