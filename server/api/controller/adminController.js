const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @desc    Register a new admin
// @route   POST /admin/register
// @access  Public

const registerAdmin = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  //   check if any of the fields are empty
  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  //   check if the admin already exists

  const userExists = await Admin.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create admin
  const admin = await Admin.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    token: generateToken(),
  });

  //   if admin created send success message
  if (admin) {
    res.status(201).json({
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Incorrect email or password");
  }
});

// @desc    Auth user & get token
// @route   POST /api/admin/login
// @access  Public
const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.json({
      token: generateToken(admin._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Get admin information
// @route   GET /admin/getAdmin/:id
// @access  Private

const getAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin).select("-password");
  res.status(200).json(admin);
});

// @desc    Update admin information
// @route   PUT /admin/update/:id
// @access  Private

const updateAdmin = asyncHandler(async (req, res) => {
  const adminId = req.admin;
  const admin = await Admin.findById(adminId);
  if (!admin) {
    res.status(404);
    throw new Error("Admin not found");
  }
  const updateProfile = await Admin.findByIdAndUpdate(adminId, req.body, {
    new: true,
  });
  res.status(200).json(updateProfile);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
module.exports = {
  updateAdmin,
  getAdmin,
  authAdmin,
  registerAdmin,
};
