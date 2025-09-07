const asyncHandler = require("express-async-handler");
const AWS = require("aws-sdk");
const { createPaymentMethod } = require("../models/paymentMethodModel");

const dynamodb = new AWS.DynamoDB.DocumentClient();

const PAYMENT_TABLE = "UserPaymentMethods";
const USER_TABLE = "Users";

/* ---------------- Add Payment Method ---------------- */
const addPaymentMethod = asyncHandler(async (req, res) => {
  const paymentMethod = createPaymentMethod(req.body);

  // Save payment method
  await dynamodb
    .put({
      TableName: PAYMENT_TABLE,
      Item: paymentMethod,
    })
    .promise();

  res.status(201).json({
    message: "Payment method added",
    paymentMethodId: paymentMethod.paymentMethodId,
  });
});

/* ---------------- Get All Payment Methods ---------------- */
const getUserPaymentMethods = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const result = await dynamodb
    .scan({
      TableName: PAYMENT_TABLE,
      FilterExpression: "userId = :uid",
      ExpressionAttributeValues: { ":uid": userId },
    })
    .promise();

  res.status(200).json(result.Items || []);
});

/* ---------------- Update Payment Method ---------------- */
const updatePaymentMethod = asyncHandler(async (req, res) => {
  const { paymentMethodId } = req.params;
  const {
    paymentType,
    cardNumber,
    expirationDate,
    billingAddress,
    paymentProvider,
  } = req.body;

  await dynamodb
    .update({
      TableName: PAYMENT_TABLE,
      Key: { paymentMethodId },
      UpdateExpression:
        "set paymentType = :pt, cardNumber = :cn, expirationDate = :ed, billingAddress = :ba, paymentProvider = :pp",
      ExpressionAttributeValues: {
        ":pt": paymentType,
        ":cn": cardNumber,
        ":ed": expirationDate,
        ":ba": billingAddress,
        ":pp": paymentProvider,
      },
    })
    .promise();

  res.status(200).json({ message: "Payment method updated" });
});

/* ---------------- Delete Payment Method ---------------- */
const deletePaymentMethod = asyncHandler(async (req, res) => {
  const { paymentMethodId } = req.params;

  await dynamodb
    .delete({
      TableName: PAYMENT_TABLE,
      Key: { paymentMethodId },
    })
    .promise();

  res.status(200).json({ message: "Payment method deleted" });
});

module.exports = {
  addPaymentMethod,
  getUserPaymentMethods,
  updatePaymentMethod,
  deletePaymentMethod,
};
