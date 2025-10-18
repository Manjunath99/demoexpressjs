const express = require("express");
const bodyParser = require("body-parser");
const licenseRoute = require("../routes/licenseRoute");

const app = express();
app.use(bodyParser.json());

app.use("/api/licenses", licenseRoute);
module.exports = app;
