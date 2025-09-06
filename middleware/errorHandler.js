const { constants } = require("../constants");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);

  switch (statusCode) {
    case constants.BAD_REQUEST:
      res.json({
        title: "bad request",
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
      });
      break;
    case constants.INTERNAL_SERVER_ERROR:
      res.json({
        title: "Internal Server Error",
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
      });
      break;

    case constants.UNAUTORIZED:
      res.json({
        title: "user is not autorized",
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
      });
      break;
    default:
      console.log(err);
      res.json({
        title: "Not Found",
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
      });
      break;
  }
};

module.exports = { errorHandler };
