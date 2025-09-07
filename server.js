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
const { errorHandler } = require("./middleware/errorHandler");

const connectDB = require("./config/dbConnection");

connectDB();
app.use(express.json());
app.use("/api/contacts", conatctRouter);
app.use("/api/users", userRouter);
app.use("/api/vehicles", vehicleRouter);
app.use("/api/reviewAndRatings", ratingReviewRouter);
app.use("/api/emergencyContacts", emergencyContactRouter);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/communications", communicationRoutes);
app.use("/api/compliances", complianceRoutes);
app.use("/api/paymentMethods", paymentMethodRoutes);

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
