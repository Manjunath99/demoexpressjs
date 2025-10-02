const express = require("express");
const bodyParser = require("body-parser");
const contactRoutes = require("../routes/contactRoute");

const app = express();
app.use(bodyParser.json());

// ⚡ Mount at root because Serverless path is api/contacts/{proxy+}
app.use("/", contactRoutes);
module.exports = app;
