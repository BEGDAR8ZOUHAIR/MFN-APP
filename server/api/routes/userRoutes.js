const express = require("express");
const router = express.Router();
const { register, login, getUsers, getUserById } = require("../controller/userController");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/allUsers").get(getUsers);
router.route("/getUserById/:id").get(getUserById);

// export route file
module.exports = router;
