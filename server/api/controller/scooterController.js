const asyncHandler = require("express-async-handler");
const Scooter = require("../models/scooterModel");


// @desc    Add a new scooter
// @route   POST /api/scooter
// @access  Private/Admin
const addScooter = asyncHandler(async (req, res) =>
{
  const { name, latitude, longitude, battery, serialNumber, status } = req.body;
  const scooter = new Scooter({
    name,
    latitude,
    longitude,
    battery,
    serialNumber,
    status,
  });
  const createdScooter = await scooter.save();
  res.status(201).json(createdScooter);
});

// @desc    Get all scooters
// @route   GET /api/scooters
// @access  Private/Admin
const getScooters = asyncHandler(async (req, res) =>
{
  const scooters = await Scooter.find({});
  res.json(scooters);
}
);

// @desc    Get scooter by ID
// @route   GET /api/scooters/:id
// @access  Private/Admin
const getScooterById = asyncHandler(async (req, res) =>
{
  const scooter = await Scooter.findById(req.params.id);
  if (scooter)
  {
    res.json(scooter);
  } else
  {
    res.status(404);
    throw new Error("Scooter not found");
  }
}
);

// @desc    Update scooter
// @route   PUT /api/scooters/:id
// @access  Private/Admin
const updateScooter = asyncHandler(async (req, res) =>
    
{
  const { name, latitude, longitude, battery, serialNumber, status } = req.body;
  const scooter = await Scooter.findById(req.params.id);
  if (scooter)
  {
    scooter.name = name;
    scooter.latitude = latitude;
    scooter.longitude = longitude;
    scooter.battery = battery;
    scooter.serialNumber = serialNumber;
    scooter.status = status;
    const updatedScooter = await scooter.save();
    res.json(updatedScooter);
  } else
  {
    res.status(404);
    throw new Error("Scooter not found");
  }
}
);

// @desc    Delete scooter
// @route   DELETE /api/scooters/:id
// @access  Private/Admin
const deleteScooter = asyncHandler(async (req, res) =>
{
  const scooter = await Scooter.findById(req.params.id);
  if (scooter)
  {
    await scooter.remove();
    res.json({ message: "Scooter removed" });
  } else
  {
    res.status(404);
    throw new Error("Scooter not found");
  }
}
);

module.exports = {
    addScooter,
    getScooters,
    getScooterById,
    updateScooter,
    deleteScooter,
};






