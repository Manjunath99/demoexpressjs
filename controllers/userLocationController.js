// controllers/userLocationController.js
const asyncHandler = require("express-async-handler");
const AWS = require("aws-sdk");
const { createUserLocation } = require("../models/userLocationModel");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const USER_TABLE = "Users";
const LOCATION_TABLE = "UserLocations";

/* -------------------- Add Location -------------------- */
const addUserLocation = asyncHandler(async (req, res) => {
  const locationItem = createUserLocation(req.body);

  await dynamodb
    .put({
      TableName: LOCATION_TABLE,
      Item: locationItem,
    })
    .promise();

  res.status(201).json({
    message: "Location added",
    locationId: locationItem.locationId,
  });
});

/* -------------------- Get All Locations -------------------- */
const getUserLocations = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const result = await dynamodb
    .query({
      TableName: LOCATION_TABLE,
      KeyConditionExpression: "userId = :uid",
      ExpressionAttributeValues: { ":uid": userId },
    })
    .promise();

  res.status(200).json(result.Items || []);
});

/* -------------------- Set Active Location -------------------- */
const setActiveLocation = asyncHandler(async (req, res) => {
  const { userId, locationId } = req.body;

  await dynamodb
    .update({
      TableName: USER_TABLE,
      Key: { userId },
      UpdateExpression: "set activeLocationId = :loc",
      ExpressionAttributeValues: {
        ":loc": locationId,
      },
    })
    .promise();

  res.status(200).json({ message: "Active location updated", locationId });
});

/* -------------------- Get Active Location -------------------- */
const getActiveLocation = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // Fetch activeLocationId from Users table
  const userResult = await dynamodb
    .get({
      TableName: USER_TABLE,
      Key: { userId },
    })
    .promise();

  if (!userResult.Item || !userResult.Item.activeLocationId) {
    return res.status(200).json({});
  }

  // Fetch location details
  const locationResult = await dynamodb
    .get({
      TableName: LOCATION_TABLE,
      Key: {
        userId,
        locationId: userResult.Item.activeLocationId,
      },
    })
    .promise();

  res.status(200).json(locationResult.Item || {});
});

/* -------------------- Delete Location -------------------- */
const deleteUserLocation = asyncHandler(async (req, res) => {
  const { userId, locationId } = req.params;

  await dynamodb
    .delete({
      TableName: LOCATION_TABLE,
      Key: { userId, locationId },
    })
    .promise();

  // If this was the active location, remove pointer from Users table
  const userResult = await dynamodb
    .get({ TableName: USER_TABLE, Key: { userId } })
    .promise();

  if (userResult.Item && userResult.Item.activeLocationId === locationId) {
    await dynamodb
      .update({
        TableName: USER_TABLE,
        Key: { userId },
        UpdateExpression: "remove activeLocationId",
      })
      .promise();
  }

  res.status(200).json({ message: "Location deleted", locationId });
});

module.exports = {
  addUserLocation,
  getUserLocations,
  setActiveLocation,
  getActiveLocation, // NEW
  deleteUserLocation,
};
