// controllers/vehicleController.js
const asyncHandler = require("express-async-handler");
const dynamodb = require("../config/dynamoDbConnection");
const TABLE_NAME = "Vehicles";

const { createVehicle } = require("../models/vehicleModel");

const addVehicleController = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.userId) {
    res.status(401);
    throw new Error("Unauthorized: No user information found");
  }
  const vehicleItem = createVehicle(req.body);

  const params = {
    TableName: TABLE_NAME,
    Item: vehicleItem,
  };

  await dynamodb.put(params).promise();
  res.status(201).json(vehicleItem);
});

const getUserVehiclesController = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!req.user || !req.user.userId) {
    res.status(401);
    throw new Error("Unauthorized: No user information found");
  }

  const params = {
    TableName: TABLE_NAME,
    FilterExpression: "userId = :uid",
    ExpressionAttributeValues: { ":uid": userId },
  };

  const result = await dynamodb.scan(params).promise();
  res.status(200).json(result.Items);
});

const getVehicleController = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.userId) {
    res.status(401);
    throw new Error("Unauthorized: No user information found");
  }
  const { vehicleId } = req.params;

  const params = {
    TableName: TABLE_NAME,
    Key: { vehicleId },
  };

  const result = await dynamodb.get(params).promise();
  res.status(200).json(result.Item);
});

const updateVehicleController = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.userId) {
    res.status(401);
    throw new Error("Unauthorized: No user information found");
  }

  const { vehicleId } = req.params;
  const updateData = req.body;

  const updateExpression = [];
  const expressionValues = {};
  const expressionNames = {};

  for (const key in updateData) {
    expressionNames[`#${key}`] = key;
    updateExpression.push(`#${key} = :${key}`);
    expressionValues[`:${key}`] = updateData[key];
  }

  const params = {
    TableName: TABLE_NAME,
    Key: { vehicleId },
    UpdateExpression: "set " + updateExpression.join(", "),
    ExpressionAttributeNames: expressionNames,
    ExpressionAttributeValues: expressionValues,
    ReturnValues: "ALL_NEW",
  };

  const result = await dynamodb.update(params).promise();

  res.status(200).json({
    message: "Vehicle updated successfully",
    vehicle: result.Attributes,
  });
});

// Delete vehicle
const deleteVehicleController = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.userId) {
    res.status(401);
    throw new Error("Unauthorized: No user information found");
  }
  const { vehicleId } = req.params;

  const params = {
    TableName: TABLE_NAME,
    Key: { vehicleId },
  };

  await dynamodb.delete(params).promise();
  res.status(200).json({ message: "Vehicle deleted successfully" });
});

module.exports = {
  addVehicleController,
  getUserVehiclesController,
  getVehicleController,
  updateVehicleController,
  deleteVehicleController,
};
