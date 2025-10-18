const express = require("express");
const bodyParser = require("body-parser");
const vehicleRoutes = require("../routes/savedRouteRoutes");

const app = express();
app.use(bodyParser.json());

app.use("/api/savedRoutes", vehicleRoutes);
module.exports = app;
