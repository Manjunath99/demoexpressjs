const express = require("express");
const bodyParser = require("body-parser");
const rideHistoryRoutes = require("../routes/rideHistoryRoutes");

const app = express();
app.use(bodyParser.json());

app.use("/api/rideHistory", rideHistoryRoutes);
module.exports = app;
