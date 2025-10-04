const AWS = require("aws-sdk");
const asyncHandler = require("express-async-handler");
const { createEmergencyContact } = require("../models/emergencyContactModel");

const dynamodb = require("../config/dynamoDbConnection");
const CONTACT_TABLE = "EmergencyContact";

/* -------------------- Add Emergency Contact -------------------- */
const addEmergencyContact = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.userId) {
    res.status(401);
    throw new Error("Unauthorized: No user information found");
  }
  const { userId } = req.params;
  const { name, phoneNumber, relationship } = req.body;

  if (!name || !phoneNumber || !relationship) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const contactItem = createEmergencyContact({
    userId,
    name,
    phoneNumber,
    relationship,
  });

  await dynamodb.put({ TableName: CONTACT_TABLE, Item: contactItem }).promise();

  res
    .status(201)
    .json({ message: "Emergency contact added", contact: contactItem });
});

/* -------------------- Get All Emergency Contacts -------------------- */
const getEmergencyContacts = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.userId) {
    res.status(401);
    throw new Error("Unauthorized: No user information found");
  }
  const { userId } = req.params;

  const result = await dynamodb
    .query({
      TableName: CONTACT_TABLE,
      IndexName: "UserIdIndex",
      KeyConditionExpression: "userId = :uid",
      ExpressionAttributeValues: { ":uid": userId },
    })
    .promise();

  console.log("User's contacts:", result.Items);

  res.status(200).json(result.Items || []);
});

/* -------------------- Update Emergency Contact -------------------- */
const updateEmergencyContact = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.userId) {
    res.status(401);
    throw new Error("Unauthorized: No user information found");
  }
  const { userId, contactId } = req.params;
  const { name, phoneNumber, relationship } = req.body;

  if (!name || !phoneNumber || !relationship) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const updateParams = {
    TableName: CONTACT_TABLE,
    Key: { contactId },
    UpdateExpression: "set #n = :n, phoneNumber = :p, relationship = :r",
    ExpressionAttributeNames: { "#n": "name" },
    ExpressionAttributeValues: {
      ":n": name,
      ":p": phoneNumber,
      ":r": relationship,
    },
    ReturnValues: "ALL_NEW",
  };

  const result = await dynamodb.update(updateParams).promise();

  res
    .status(200)
    .json({ message: "Emergency contact updated", contact: result.Attributes });
});

/* -------------------- Delete Emergency Contact -------------------- */
const deleteEmergencyContact = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.userId) {
    res.status(401);
    throw new Error("Unauthorized: No user information found");
  }
  const { userId, contactId } = req.params;
  console.log("userIduserIduserIduserId", userId, contactId);

  await dynamodb
    .delete({
      TableName: CONTACT_TABLE,
      Key: { contactId },
    })
    .promise();

  res.status(200).json({ message: "Emergency contact deleted", contactId });
});

module.exports = {
  addEmergencyContact,
  getEmergencyContacts,
  updateEmergencyContact,
  deleteEmergencyContact,
};
