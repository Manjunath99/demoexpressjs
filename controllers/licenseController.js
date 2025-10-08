// controllers/licenseController.js
const asyncHandler = require("express-async-handler");
const dynamodb = require("../config/dynamoDbConnection");
const TABLE_NAME = "Licenses";

const { createLicense } = require("../models/licenseModel");

// Add a new license
const addLicenseController = asyncHandler(async (req, res) => {
  console.log("Request Body:", req.body);
  if (!req.user || !req.user.userId) {
    res.status(401);
    throw new Error("Unauthorized: No user information found");
  }

  const licenseItem = createLicense({ ...req.body, userId: req.user.userId });

  const params = {
    TableName: TABLE_NAME,
    Item: licenseItem,
  };

  await dynamodb.put(params).promise();
  res.status(201).json(licenseItem);
});

// Get all licenses of a user
const getUserLicensesController = asyncHandler(async (req, res) => {
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

// Get a single license by ID
const getLicenseController = asyncHandler(async (req, res) => {
  const { licenseId } = req.params;

  if (!req.user || !req.user.userId) {
    res.status(401);
    throw new Error("Unauthorized: No user information found");
  }

  const params = {
    TableName: TABLE_NAME,
    Key: { licenseId },
  };

  const result = await dynamodb.get(params).promise();
  res.status(200).json(result.Item);
});

// Update a license
const updateLicenseController = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.userId) {
    res.status(401);
    throw new Error("Unauthorized: No user information found");
  }
  const { licenseId } = req.params;
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
    Key: { licenseId },
    UpdateExpression: "set " + updateExpression.join(", "),
    ExpressionAttributeNames: expressionNames,
    ExpressionAttributeValues: expressionValues,
    ReturnValues: "ALL_NEW",
  };

  const result = await dynamodb.update(params).promise();

  res.status(200).json({
    message: "License updated successfully",
    license: result.Attributes,
  });
});

// Delete a license
const deleteLicenseController = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.userId) {
    res.status(401);
    throw new Error("Unauthorized: No user information found");
  }
  const { licenseId } = req.params;

  const params = {
    TableName: TABLE_NAME,
    Key: { licenseId },
  };

  await dynamodb.delete(params).promise();
  res.status(200).json({ message: "License deleted successfully" });
});

module.exports = {
  addLicenseController,
  getUserLicensesController,
  getLicenseController,
  updateLicenseController,
  deleteLicenseController,
};
