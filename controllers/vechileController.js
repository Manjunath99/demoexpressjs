// controllers/vehicleController.js
const asyncHandler = require("express-async-handler");
const dynamodb = require("../config/dynamoDbConnection");
const TABLE_NAME = "Vehicles";

const { createVehicle } = require("../models/vehicleModel");

const addVehicleController = asyncHandler(async (req, res) => {
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

  const params = {
    TableName: TABLE_NAME,
    FilterExpression: "userId = :uid",
    ExpressionAttributeValues: { ":uid": userId },
  };

  const result = await dynamodb.scan(params).promise();
  res.status(200).json(result.Items);
});

const getVehicleController = asyncHandler(async (req, res) => {
  const { vehicleId } = req.params;

  const params = {
    TableName: TABLE_NAME,
    Key: { vehicleId },
  };

  const result = await dynamodb.get(params).promise();
  res.status(200).json(result.Item);
});

const updateVehicleController = asyncHandler(async (req, res) => {
  const { vehicleId } = req.params;
  const updateData = req.body;

  const updateExpression = [];
  const expressionValues = {};

  for (const key in updateData) {
    updateExpression.push(`${key} = :${key}`);
    expressionValues[`:${key}`] = updateData[key];
  }

  const params = {
    TableName: TABLE_NAME,
    Key: { vehicleId },
    UpdateExpression: "set " + updateExpression.join(", "),
    ExpressionAttributeValues: expressionValues,
    ReturnValues: "ALL_NEW",
  };

  const result = await dynamodb.update(params).promise();
  res.status(200).json(result.Attributes);
});

// Delete vehicle
const deleteVehicleController = asyncHandler(async (req, res) => {
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
