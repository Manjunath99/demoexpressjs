// controllers/communicationController.js
const asyncHandler = require("express-async-handler");
const AWS = require("aws-sdk");
const { createUserCommunication } = require("../models/communicationModel");

const dynamodb = new AWS.DynamoDB.DocumentClient();

const USER_TABLE = "Users";
const COMM_TABLE = "UserCommunication";

/* -------------------- Add / Update Communication Prefs -------------------- */
const upsertCommunication = asyncHandler(async (req, res) => {
  const communicationItem = createUserCommunication(req.body);

  // Save to communication table
  await dynamodb
    .put({
      TableName: COMM_TABLE,
      Item: communicationItem,
    })
    .promise();

  // Update snapshot in Users table
  await dynamodb
    .update({
      TableName: USER_TABLE,
      Key: { userId: communicationItem.userId },
      UpdateExpression:
        "set receivePromotionalNotifications = :promo, receiveRideUpdates = :ride, receiveSafetyAlerts = :safety",
      ExpressionAttributeValues: {
        ":promo": communicationItem.receivePromotionalNotifications,
        ":ride": communicationItem.receiveRideUpdates,
        ":safety": communicationItem.receiveSafetyAlerts,
      },
    })
    .promise();

  res.status(201).json({
    message: "Communication preferences saved",
    userId: communicationItem.userId,
  });
});

/* -------------------- Get Communication Prefs -------------------- */
const getCommunication = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const result = await dynamodb
    .get({
      TableName: COMM_TABLE,
      Key: { userId },
    })
    .promise();

  res.status(200).json(result.Item || {});
});

/* -------------------- Delete Communication Prefs -------------------- */
const deleteCommunication = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  await dynamodb
    .delete({
      TableName: COMM_TABLE,
      Key: { userId },
    })
    .promise();

  // Also reset in Users table
  await dynamodb
    .update({
      TableName: USER_TABLE,
      Key: { userId },
      UpdateExpression:
        "set receivePromotionalNotifications = :promo, receiveRideUpdates = :ride, receiveSafetyAlerts = :safety",
      ExpressionAttributeValues: {
        ":promo": false,
        ":ride": false,
        ":safety": false,
      },
    })
    .promise();

  res
    .status(200)
    .json({ message: "Communication preferences deleted", userId });
});

module.exports = {
  upsertCommunication,
  getCommunication,
  deleteCommunication,
};
