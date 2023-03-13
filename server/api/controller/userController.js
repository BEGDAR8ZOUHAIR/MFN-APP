const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @desc    Register a new user
// @route   POST /admin/register
// @access  Public

const register = asyncHandler(async (req, res) =>
{

  const { companyName, email, password, phone, address, longitude, latitude } = req.body;

  //   check if any of the fields are empty
  if (!companyName || !email || !password || !phone || !address || !longitude || !latitude)
  {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  //   check if the admin already exists

  const userExists = await User.findOne({
    email: email.toLowerCase(),
  });
  if (userExists)
  {
    res.status(400);
    throw new Error("User already exists");
  }



  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create admin
  const user = await User.create({
    
    companyName,
    phone,
    address,
    longitude,
    latitude,
    email: email.toLowerCase(),
    password: hashedPassword,
    token: generateToken(),
  });

  //   if admin created send success message
  if (user)
  {
    res.status(201).json({
      token: generateToken(user._id),
    });
  } else
  {
    res.status(400);
    throw new Error("Incorrect email or password");
  }
});

// @desc    Auth user & get token
// @route   POST /api/admin/login
// @access  Public

const login = asyncHandler(async (req, res) =>
{
  const { email, password } = req.body;
  const user = await User.findOne({
    email: email.toLowerCase(),
  });

  if (user && (await bcrypt.compare(password, user.password)))
  {
    res.json({
      token: generateToken(user._id),
      id: user._id,
    });
  } else
  {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});


// @desc    Get all users
// @route   GET /allUsers
// @access  Private

const getUsers = asyncHandler(async (req, res) =>
{
  const users = await User.find({});
  res.json(users);

});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private

const getUserById = asyncHandler(async (req, res) =>
{
  const user = await User.findById(req.params.id);
     
  if (user)
  {
    res.json(user);
  } else
  {
    res.status(404);
    throw new Error("User not found");
  }
});




// Generate JWT
const generateToken = (id) =>
{
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = {
  register,
  login,
  getUsers,
  getUserById,
};
