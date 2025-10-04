const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dynamodb = require("../config/dynamoDbConnection");
const { createUser } = require("../models/dynamoDbUserModel");

const TABLE_NAME = "Users";

const register = asyncHandler(async (req, res) => {
  const { phoneNumber, password } = req.body;

  if (!phoneNumber || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const phoneParams = {
    TableName: TABLE_NAME,
    IndexName: "PhoneNumberIndex",
    KeyConditionExpression: "phoneNumber = :phoneNumber",
    ExpressionAttributeValues: {
      ":phoneNumber": phoneNumber,
    },
  };

  const existing = await dynamodb.query(phoneParams).promise();

  if (existing.Items.length > 0) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const userItem = createUser({ phoneNumber, passwordHash: hashedPassword });

  const params = { TableName: TABLE_NAME, Item: userItem };
  await dynamodb.put(params).promise();

  res.status(201).json({ message: "User created", user: userItem });
});

const login = asyncHandler(async (req, res) => {
  const { phoneNumber, password } = req.body;
  if (!phoneNumber || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const params = {
    TableName: TABLE_NAME,
    IndexName: "PhoneNumberIndex",
    KeyConditionExpression: "phoneNumber = :phoneNumber",
    ExpressionAttributeValues: {
      ":phoneNumber": phoneNumber,
    },
    Limit: 1,
  };

  const result = await dynamodb.query(params).promise();
  const user = result.Items[0];

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.passwordHash);

  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid credentials");
  }
  const aceessToken = jwt.sign(
    { userId: user.userId, name: user.phoneNumber },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  res.status(200).json({ aceessToken });
});

const currentUser = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.userId) {
    res.status(401);
    throw new Error("Unauthorized: No user information found");
  }
  const { userId } = req.user;

  const params = {
    TableName: TABLE_NAME,
    Key: { userId },
  };

  const result = await dynamodb.get(params).promise();

  if (!result.Item) {
    res.status(404);
    throw new Error("User not found");
  }
  const { passwordHash, ...userWithoutPassword } = result.Item;

  res.status(200).json(userWithoutPassword);
});

const updateUser = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.userId) {
    res.status(401);
    throw new Error("Unauthorized: No user information found");
  }

  const { userId } = req.user;
  const data = req.body;
  if (!data || Object.keys(data).length === 0) {
    res.status(400);
    throw new Error("No data provided for update");
  }

  let updateExpression = "set";
  const ExpressionAttributeNames = {};
  const ExpressionAttributeValues = {};

  Object.entries(data).forEach(([key, value]) => {
    updateExpression += ` #${key} = :${key},`;
    ExpressionAttributeNames[`#${key}`] = key;
    ExpressionAttributeValues[`:${key}`] = value;
  });

  updateExpression = updateExpression.replace(/,$/, "");

  const params = {
    TableName: TABLE_NAME,
    Key: { userId },
    UpdateExpression: updateExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    ReturnValues: "ALL_NEW",
  };

  const result = await dynamodb.update(params).promise();
  const updatedUser = result.Attributes;

  delete updatedUser.passwordHash;

  res.status(200).json({
    message: "User updated successfully",
    user: updatedUser,
  });
});

module.exports = {
  register,
  login,
  currentUser,
  updateUser,
};
