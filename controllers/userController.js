const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dynamodb = require("../config/dynamoDbConnection");
const { createUser } = require("../models/dynamoDbUserModel");

const TABLE_NAME = "Users";

//@desc register a user
//@route POST /api/users
//@access public
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const emailParams = {
    TableName: TABLE_NAME,
    IndexName: "EmailIndex",
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: { ":email": email },
  };

  const existing = await dynamodb.query(emailParams).promise();
  if (existing.Items.length > 0) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const userItem = createUser({ name, email, password: hashedPassword });

  const params = { TableName: TABLE_NAME, Item: userItem };
  await dynamodb.put(params).promise();

  res.status(201).json({ message: "User created", user: userItem });
});

//@desc login a user
//@route POST /api/users
//@access public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const params = {
    TableName: TABLE_NAME,
    IndexName: "EmailIndex",
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email,
    },
    Limit: 1,
  };

  const result = await dynamodb.query(params).promise();
  const user = result.Items[0];

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid credentials");
  }
  console.log("User logged in:", user); // Debugging line
  const aceessToken = jwt.sign(
    { userId: user.userId, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.status(200).json({ aceessToken });
});

//@desc get a current user
//@route GET /api/users
//@access private
const currentUser = asyncHandler(async (req, res) => {
  console.log("Current user request:", req.user); // Debugging line
  if (!req.user || !req.user.userId) {
    res.status(401);
    throw new Error("Unauthorized: No user information found");
  }
  const { userId } = req.user;

  const params = {
    TableName: TABLE_NAME,
    Key: { userId }, // DynamoDB primary key
  };

  const result = await dynamodb.get(params).promise();

  if (!result.Item) {
    res.status(404);
    throw new Error("User not found");
  }
  const { password, ...userWithoutPassword } = result.Item;

  res.status(200).json(userWithoutPassword);
});

module.exports = {
  register,
  login,
  currentUser,
};
