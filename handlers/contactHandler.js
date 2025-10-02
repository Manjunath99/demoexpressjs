const serverless = require("serverless-http");
const contactApp = require("../app/contactApp");

module.exports.handler = serverless(contactApp);
