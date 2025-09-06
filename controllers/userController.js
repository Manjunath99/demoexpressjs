const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc register a user
//@route POST /api/users
//@access public
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body, password, "bodydddd");

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const user = await User.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (!newUser) {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.status(200).json(newUser);
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
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid credentials");
  }
  const aceessToken = jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.status(200).json({ aceessToken });
});
//@desc get a current user
//@route GET /api/users
//@access public
const currentUser = asyncHandler(async (req, res) => {
  console.log(req.user);
  res.status(200).json(req.user);
});

module.exports = {
  register,
  login,
  currentUser,
};
