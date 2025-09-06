const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const conatctRouter = require("./routes/contactRoute");
const userRouter = require("./routes/userRoutes");
const { errorHandler } = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");

connectDB();
app.use(express.json());
app.use("/api/contacts", conatctRouter);
app.use("/api/users", userRouter);

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
