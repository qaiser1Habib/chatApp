const express = require("express");
const { registerUser, login, getUsers, getLoggedInUser } = require("../controllers/user");
const router = express.Router();
const { jwtAuthentication } = require("../middlewares/authentications/jwtAuthentication.js");

router
	.post("/register", registerUser)
	.post("/", login)
	.get("/", jwtAuthentication, getUsers)
	.get("/login-user", jwtAuthentication, getLoggedInUser);

exports.router = router;
