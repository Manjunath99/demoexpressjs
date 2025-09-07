// controllers/subscriptionController.js
const asyncHandler = require("express-async-handler");
const AWS = require("aws-sdk");
const { createUserSubscription } = require("../models/subscriptionModel");

const dynamodb = new AWS.DynamoDB.DocumentClient();

const USER_TABLE = "Users";
const SUBSCRIPTION_TABLE = "UserSubscriptions";

/* -------------------- Add Subscription -------------------- */
const addSubscription = asyncHandler(async (req, res) => {
  const subscriptionItem = createUserSubscription(req.body);

  // Save subscription record
  await dynamodb
    .put({
      TableName: SUBSCRIPTION_TABLE,
      Item: subscriptionItem,
    })
    .promise();

  // Update user table
  await dynamodb
    .update({
      TableName: USER_TABLE,
      Key: { userId: subscriptionItem.userId },
      UpdateExpression: "set isSubscribed = :sub, planName = :plan",
      ExpressionAttributeValues: {
        ":sub": true,
        ":plan": subscriptionItem.planName,
      },
    })
    .promise();

  res.status(201).json({
    message: "Subscription added",
    subscriptionId: subscriptionItem.subscriptionId,
  });
});

/* -------------------- Update Subscription -------------------- */
const updateSubscription = asyncHandler(async (req, res) => {
  const { subscriptionId, userId, planName, endDate, costPerMonth } = req.body;

  // Update subscription record
  await dynamodb
    .update({
      TableName: SUBSCRIPTION_TABLE,
      Key: { subscriptionId },
      UpdateExpression:
        "set planName = :plan, endDate = :end, costPerMonth = :cost, isActive = :active",
      ExpressionAttributeValues: {
        ":plan": planName,
        ":end": endDate || null,
        ":cost": costPerMonth || 0,
        ":active": true, // ensures the new plan is active
      },
    })
    .promise();

  // Update user table to reflect the new plan
  await dynamodb
    .update({
      TableName: USER_TABLE,
      Key: { userId },
      UpdateExpression: "set isSubscribed = :sub, planName = :plan",
      ExpressionAttributeValues: {
        ":sub": true,
        ":plan": planName,
      },
    })
    .promise();

  res.status(200).json({ message: "Subscription updated", subscriptionId });
});

/* -------------------- Cancel Subscription -------------------- */
const cancelSubscription = asyncHandler(async (req, res) => {
  const { subscriptionId, userId } = req.body;

  // Mark subscription inactive
  await dynamodb
    .update({
      TableName: SUBSCRIPTION_TABLE,
      Key: { subscriptionId },
      UpdateExpression: "set isActive = :inactive, endDate = :end",
      ExpressionAttributeValues: {
        ":inactive": false,
        ":end": new Date().toISOString(),
      },
    })
    .promise();

  // Update user table (reset subscription flags)
  await dynamodb
    .update({
      TableName: USER_TABLE,
      Key: { userId },
      UpdateExpression: "set isSubscribed = :sub remove planName",
      ExpressionAttributeValues: {
        ":sub": false,
      },
    })
    .promise();

  res.status(200).json({ message: "Subscription cancelled" });
});

/* -------------------- Get Active Subscription -------------------- */
const getActiveSubscription = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const result = await dynamodb
    .scan({
      TableName: SUBSCRIPTION_TABLE,
      FilterExpression: "userId = :uid AND isActive = :active",
      ExpressionAttributeValues: {
        ":uid": userId,
        ":active": true,
      },
    })
    .promise();

  res.status(200).json(result.Items[0] || {});
});

module.exports = {
  addSubscription,
  updateSubscription,
  cancelSubscription,
  getActiveSubscription,
};
