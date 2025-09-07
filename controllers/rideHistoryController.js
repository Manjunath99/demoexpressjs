const AWS = require("aws-sdk");
const asyncHandler = require("express-async-handler");
const { createRideHistory } = require("../models/rideHistoryModel");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const RIDE_TABLE = "RideHistory";

/* -------------------- Add Ride -------------------- */
const addRide = asyncHandler(async (req, res) => {
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
  const { rideId } = req.params;
  const updateData = req.body;

  const updateExpression = [];
  const expressionValues = {};

  for (const key in updateData) {
    updateExpression.push(`${key} = :${key}`);
    expressionValues[`:${key}`] = updateData[key];
  }

  const result = await dynamodb
    .update({
      TableName: RIDE_TABLE,
      Key: { rideId },
      UpdateExpression: "set " + updateExpression.join(", "),
      ExpressionAttributeValues: expressionValues,
      ReturnValues: "ALL_NEW",
    })
    .promise();

  res.status(200).json({ message: "Ride updated", ride: result.Attributes });
});

/* -------------------- Delete Ride -------------------- */
const deleteRide = asyncHandler(async (req, res) => {
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
