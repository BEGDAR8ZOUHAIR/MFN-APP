const express = require("express");
const router = express.Router();

// get function from client controller
const {
    registerClient,
    authClient,
    getClient,
    updateClient,
   
} = require("../controller/clientController");

// get function from scooter controller
const {
    addScooter,
    getScooters,
    getScooterById,
    updateScooter,
    deleteScooter,
} = require("../controller/scooterController");

//  Protect all routes
const { protect } = require("../middleware/authMiddleware");

// Client routes
router.route("/login").post(authClient);
router.route("/register").post(registerClient);
router.route("/update/:id").put(protect, updateClient);
router.route("/getClient/:id").get(protect, getClient);

// Scooter routes
router.route("/scooters").post( addScooter);
router.route("/scooters").get( getScooters);
router.route("/scooters/:id").get( getScooterById);
router.route("/scooters/:id").put( updateScooter);
router.route("/scooters/:id").delete( deleteScooter);


// export route file
module.exports = router;
