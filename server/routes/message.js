const express = require("express");
const { allMessages, sendMessage,  } = require("../controllers/message.js");
const router = express.Router();
const { jwtAuthentication } = require("../middlewares/authentications/jwtAuthentication.js");

router
	.post("/", jwtAuthentication, sendMessage)
	.get("/", jwtAuthentication, allMessages)
	.get("/user-messages", jwtAuthentication);

exports.router = router;
