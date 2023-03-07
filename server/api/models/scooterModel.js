const mongoose = require("mongoose");

const scooterchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your full name"],
    },
    latitude: {
      type: String,
      required: [true, "Please enter your latitude"],
    },
    longitude: {
      type: String,
      required: [true, "Please enter your longitude"],
    },
    battery: {
      type: String,
      required: [true, "Please enter your battery"],
    },
    serialNumber: {
      type: String,
      required: [true, "Please enter your serialNumber"],
    },
    status: {
      type: String,
      required: [true, "Please enter your status"],
      default: "available",
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Scooter", scooterchema);
