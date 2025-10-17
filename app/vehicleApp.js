const express = require("express");
const bodyParser = require("body-parser");
const vehicleRoutes = require("../routes/vehicleRouter");

const app = express();
app.use(bodyParser.json());

app.use("/api/vehicles", vehicleRoutes);
module.exports = app;
