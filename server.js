const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const conatctRouter = require("./routes/contactRoute");
const userRouter = require("./routes/userRoutes");
const vehicleRouter = require("./routes/vehicleRouter");
const ratingReviewRouter = require("./routes/ratingReviewRoute");
const emergencyContactRouter = require("./routes/emergencyContactRoute");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const communicationRoutes = require("./routes/communicationRoutes");
const complianceRoutes = require("./routes/complianceRoutes");
const paymentMethodRoutes = require("./routes/paymentMethodRoutes");
const savedRoutesRoute = require("./routes/savedRouteRoutes");
const rideHistoryRoute = require("./routes/rideHistoryRoutes");
const licenseRoute = require("./routes/licenseRoute");
const { errorHandler } = require("./middleware/errorHandler");
//const olaMapsRoutes = require("./routes/olaMapsRoutes");

const connectDB = require("./config/dbConnection");
const ROUTES = require("./constants/routeName");

//connectDB();
app.use(express.json());

app.use(ROUTES.CONTACTS, conatctRouter);
app.use(ROUTES.USERS, userRouter);
app.use(ROUTES.VEHICLES, vehicleRouter);
app.use(ROUTES.REVIEWS, ratingReviewRouter);
app.use(ROUTES.EMERGENCY_CONTACTS, emergencyContactRouter);
app.use(ROUTES.SUBSCRIPTIONS, subscriptionRoutes);
app.use(ROUTES.COMMUNICATIONS, communicationRoutes);
app.use(ROUTES.COMPLIANCES, complianceRoutes);
app.use(ROUTES.PAYMENT_METHODS, paymentMethodRoutes);
app.use(ROUTES.SAVED_ROUTES, savedRoutesRoute);
app.use(ROUTES.RIDE_HISTORY, rideHistoryRoute);
app.use(ROUTES.LICENSES, licenseRoute);
//app.use("/api/olamaps", olaMapsRoutes);

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
