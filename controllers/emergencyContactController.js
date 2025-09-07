const AWS = require("aws-sdk");
const asyncHandler = require("express-async-handler");
const { createEmergencyContact } = require("../models/emergencyContactModel");

const dynamodb = require("../config/dynamoDbConnection");
const CONTACT_TABLE = "EmergencyContact";

/* -------------------- Add Emergency Contact -------------------- */
const addEmergencyContact = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { name, phoneNumber, relationship } = req.body;

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
  const { userId } = req.params;

  const result = await dynamodb
    .query({
      TableName: CONTACT_TABLE,
      KeyConditionExpression: "userId = :uid",
      ExpressionAttributeValues: { ":uid": userId },
    })
    .promise();

  res.status(200).json(result.Items || []);
});

/* -------------------- Update Emergency Contact -------------------- */
const updateEmergencyContact = asyncHandler(async (req, res) => {
  const { userId, contactId } = req.params;
  const { name, phoneNumber, relationship } = req.body;

  const updateParams = {
    TableName: CONTACT_TABLE,
    Key: { userId, contactId },
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
  const { userId, contactId } = req.params;

  await dynamodb
    .delete({
      TableName: CONTACT_TABLE,
      Key: { userId, contactId },
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
