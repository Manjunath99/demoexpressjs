// controllers/complianceController.js
const asyncHandler = require("express-async-handler");
const AWS = require("aws-sdk");
const { createUserCompliance } = require("../models/complianceModel");

const dynamodb = new AWS.DynamoDB.DocumentClient();

const USER_TABLE = "Users";
const COMPLIANCE_TABLE = "UserCompliance";

/* -------------------- Add / Update Compliance -------------------- */
const upsertCompliance = asyncHandler(async (req, res) => {
  const complianceItem = createUserCompliance(req.body);

  // Save compliance record
  await dynamodb
    .put({
      TableName: COMPLIANCE_TABLE,
      Item: complianceItem,
    })
    .promise();

  // Mirror isVerified into Users table
  await dynamodb
    .update({
      TableName: USER_TABLE,
      Key: { userId: complianceItem.userId },
      UpdateExpression: "set isVerified = :verified",
      ExpressionAttributeValues: {
        ":verified": complianceItem.isVerified,
      },
    })
    .promise();

  res.status(201).json({
    message: "Compliance record saved",
    userId: complianceItem.userId,
  });
});

/* -------------------- Get Compliance -------------------- */
const getCompliance = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const result = await dynamodb
    .get({
      TableName: COMPLIANCE_TABLE,
      Key: { userId },
    })
    .promise();

  res.status(200).json(result.Item || {});
});

/* -------------------- Delete Compliance -------------------- */
const deleteCompliance = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  await dynamodb
    .delete({
      TableName: COMPLIANCE_TABLE,
      Key: { userId },
    })
    .promise();

  // Reset isVerified in Users table
  await dynamodb
    .update({
      TableName: USER_TABLE,
      Key: { userId },
      UpdateExpression: "set isVerified = :verified",
      ExpressionAttributeValues: {
        ":verified": false,
      },
    })
    .promise();

  res.status(200).json({ message: "Compliance record deleted", userId });
});

module.exports = {
  upsertCompliance,
  getCompliance,
  deleteCompliance,
};
