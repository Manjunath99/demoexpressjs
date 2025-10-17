const express = require("express");
const bodyParser = require("body-parser");
const contactRoutes = require("../routes/emergencyContactRoute");

const app = express();
app.use(bodyParser.json());

// ⚡ Mount at root because Serverless path is api/contacts/{proxy+}
app.use("/api/emergencyContacts", contactRoutes);
module.exports = app;
