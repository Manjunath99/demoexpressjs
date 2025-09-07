const asyncHandler = require("express-async-handler");
const AWS = require("aws-sdk");
const {
  createAuthenticationDetails,
} = require("../models/authenticationModel");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const AUTH_TABLE = "UserAuthentication";

/* -------------------- Add / Update Auth Details -------------------- */
const upsertAuthDetails = asyncHandler(async (req, res) => {
  const authItem = createAuthenticationDetails(req.body);

  // Upsert (put) auth details
  await dynamodb
    .put({
      TableName: AUTH_TABLE,
      Item: authItem,
    })
    .promise();

  res.status(201).json({
    message: "Authentication details added/updated",
    userId: authItem.userId,
    oauthTokens: authItem.oauthTokens,
  });
});

/* -------------------- Get Auth Details by User -------------------- */
const getAuthDetails = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const result = await dynamodb
    .get({
      TableName: AUTH_TABLE,
      Key: { userId },
    })
    .promise();

  if (!result.Item) {
    return res.status(404).json({ message: "Auth details not found" });
  }

  // Don't send passwordHash to frontend
  const { passwordHash, ...safeData } = result.Item;

  res.status(200).json(safeData);
});

module.exports = { upsertAuthDetails, getAuthDetails };
