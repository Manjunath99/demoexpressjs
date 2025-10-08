const AWS = require("aws-sdk");
const asyncHandler = require("express-async-handler");
const { createRideHistory } = require("../models/rideHistoryModel");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const RIDE_TABLE = "RideHistory";

/* -------------------- Add Ride -------------------- */
const addRide = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.userId) {
    res.status(401);
    throw new Error("Unauthorized: No user information found");
  }
  const rideItem = createRideHistory(req.body);

  await dynamodb
    .put({
      TableName: RIDE_TABLE,
      Item: rideItem,
    })
    .promise();

  res.status(201).json({ message: "Ride added", ride: rideItem });
});

/* -------------------- Get Ride by rideId -------------------- */
const getRideById = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.userId) {
    res.status(401);
    throw new Error("Unauthorized: No user information found");
  }
  const { rideId } = req.params;

  const result = await dynamodb
    .get({
      TableName: RIDE_TABLE,
      Key: { rideId },
    })
    .promise();

  res.status(200).json(result.Item || {});
});

/* -------------------- Get all rides for a user -------------------- */
const getRidesByUser = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.userId) {
    res.status(401);
    throw new Error("Unauthorized: No user information found");
  }
  const { userId } = req.params;

  // Scan for rides where user is either driver or passenger
  const result = await dynamodb
    .scan({
      TableName: RIDE_TABLE,
      FilterExpression: "driverId = :uid OR passengerId = :uid",
      ExpressionAttributeValues: { ":uid": userId },
    })
    .promise();

  res.status(200).json(result.Items || []);
});

/* -------------------- Update Ride -------------------- */
const updateRide = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.userId) {
    res.status(401);
    throw new Error("Unauthorized: No user information found");
  }

  const { rideId } = req.params;
  const updateData = req.body;

  if (!rideId) {
    res.status(400);
    throw new Error("Ride ID is required");
  }

  if (!updateData || Object.keys(updateData).length === 0) {
    res.status(400);
    throw new Error("No update data provided");
  }

  const updateExpression = [];
  const expressionValues = {};
  const expressionNames = {};

  for (const key in updateData) {
    updateExpression.push(`#${key} = :${key}`);
    expressionValues[`:${key}`] = updateData[key];
    expressionNames[`#${key}`] = key;
  }

  const params = {
    TableName: RIDE_TABLE,
    Key: { rideId },
    UpdateExpression: "SET " + updateExpression.join(", "),
    ExpressionAttributeValues: expressionValues,
    ExpressionAttributeNames: expressionNames,
    ReturnValues: "ALL_NEW",
  };

  const result = await dynamodb.update(params).promise();

  res.status(200).json({
    message: "Ride updated successfully",
    ride: result.Attributes,
  });
});

/* -------------------- Delete Ride -------------------- */
const deleteRide = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.userId) {
    res.status(401);
    throw new Error("Unauthorized: No user information found");
  }
  const { rideId } = req.params;

  await dynamodb
    .delete({
      TableName: RIDE_TABLE,
      Key: { rideId },
    })
    .promise();

  res.status(200).json({ message: "Ride deleted", rideId });
});

module.exports = {
  addRide,
  getRideById,
  getRidesByUser,
  updateRide,
  deleteRide,
};
