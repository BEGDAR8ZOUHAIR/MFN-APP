const asyncHandler = require("express-async-handler");
const Client = require("../models/clientModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @desc    Register a new client
// @route   POST /client/register
// @access  Public

const registerClient = asyncHandler(async (req, res) =>
{
  const { fullName, email, password } = req.body;
  

  //   check if any of the fields are empty
  if (!fullName || !email || !password )
  {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  //   check if the client already exists

  const userExists = await Client.findOne({ email });
  if (userExists)
  {
    res.status(400);
    throw new Error("Client already exists");
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create client
  const client = await Client.create({
    fullName,
    email,
    password: hashedPassword,
    token: generateToken(),
  });

  //   if client created send success message
  if (client)
  {
    res.status(201).json({
      token: generateToken(client._id),
    });
  } else
  {
    res.status(400);
    throw new Error("Incorrect email or password");
  }
});

// @desc    Auth client & get token
// @route   POST /api/client/login
// @access  Public
const authClient = asyncHandler(async (req, res) =>
{
  const { email, password } = req.body;
  const client = await Client.findOne({ email });

  if (client && (await bcrypt.compare(password, client.password)))
  {
    res.json({
      token: generateToken(client._id),
      id: client._id,
      
    });
  } else
  {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Get client information
// @route   GET /client/getClient/:id
// @access  Private

const getClient = asyncHandler(async (req, res) =>
{
  const clientId = req.params.id;
  const client = await Client.findById(clientId);
  if (!client)
  {
    res.status(404);
    throw new Error(" client not found");
  }
  res.status(200).json(client);

});

// @desc    Update client information
// @route   PUT /client/update/:id
// @access  Private

const updateClient = asyncHandler(async (req, res) =>
{
  const clientId = req.params.id;
 
  const client = await Client.findById(clientId);
  if (!client)
  {
    res.status(404);
    throw new Error(" client not found");
  }
  const updateProfile = await Client.findByIdAndUpdate(clientId, req.body, {
    new: true,
  });
  res.status(200).json(updateProfile);
});



// Generate JWT
const generateToken = (id) =>
{
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};


// @desc    Get a single client
// @route   GET /client/singleClient/:id
// @access  Private
const singleClient = asyncHandler(async (req, res) =>
{
  const client = await Client.findById(req.params.id)
  res.send(client);
});

// @desc    Get all clients
// @route   GET /client/clients
// @access  Private

const getClients = asyncHandler(async (req, res) =>
{
  const clients = await Client.find();
  res.send(clients);
});

// @desc    Get total clients
// @route   GET /client/totalClients
// @access  Private

const totalClients = asyncHandler(async (req, res) =>
{
  const total = await Client.countDocuments();
  res.status(200).json(total);
});

module.exports = {
  singleClient,
  getClients,
  totalClients,
  updateClient,
  authClient,
  getClient,
  registerClient,

};
