const express = require("express");
const { accessChat, fetchChats, renameGroupChat, createGroupChats, addToGroup, deleteFromGroup } = require("../controllers/chat");
const router = express.Router();
const { jwtAuthentication } = require("../middlewares/authentications/jwtAuthentication.js");

router
	.post("/", jwtAuthentication, accessChat)
	.get("/", jwtAuthentication, fetchChats)
	.post("/create-group", jwtAuthentication, createGroupChats)
	.put("/", jwtAuthentication, renameGroupChat)
	.post("/add-user", jwtAuthentication, addToGroup)
	.delete("/delete-user", jwtAuthentication, deleteFromGroup);

exports.router = router;
