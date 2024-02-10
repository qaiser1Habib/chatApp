const express = require("express");
const { jwtAuthentication } = require("../middlewares/authentications/jwtAuthentication.js");
const { userAuthorization } = require("../middlewares/authentications/userAuthorization.js");
const multerMiddleware = require("../middlewares/storage/multerMiddleware.js");

const {
	getChat,
	getChatGroups,
	accessChat,
	getAllMessages,
	sendMessage,
	// getChatGroupImage,
	createChatGroup,
	allMessagesForUser,
	// updateChatGroup,
	// reportMessage,
	// deleteChatGroup,
	// getChatMessageMedia,
	// leaveChatGroup,
	// getChatReports,
	// updateMessageReportStatus,
	// deleteChatMessage,
} = require("../controllers/chats.js");

const router = express.Router();

router.get("/chat", jwtAuthentication, userAuthorization(["admin", "user"]), getChat);
router.get("/chat/get-messages", jwtAuthentication, userAuthorization(["admin", "user"]), getAllMessages);
router.get("/chat-getUserMessages", jwtAuthentication, userAuthorization(["admin", "user"]), allMessagesForUser);
router.post("/chat", jwtAuthentication, userAuthorization(["admin", "user"]), accessChat);
router.post("/chat-sendMsg", jwtAuthentication, userAuthorization(["admin", "user"]), sendMessage);
// router.get("/chat/media", getChatMessageMedia);
// router.delete("/chat/message", jwtAuthentication, userAuthorization(["admin", "member"]), deleteChatMessage);
// router.get("/chat/report-message", jwtAuthentication, userAuthorization(["admin"]), getChatReports);
// router.post("/chat/report-message", jwtAuthentication, userAuthorization(["admin", "member"]), reportMessage);
// router.put("/chat/report-message", jwtAuthentication, userAuthorization(["admin"]), updateMessageReportStatus);

router.get("/groups", jwtAuthentication, userAuthorization(["admin", "user"]), getChatGroups);
router.post("/create-group", jwtAuthentication, userAuthorization(["admin", "user"]), multerMiddleware(), createChatGroup);
// router.put("/groups", jwtAuthentication, userAuthorization(["admin"]), multerMiddleware(), updateChatGroup);
// router.delete("/groups/leave", jwtAuthentication, userAuthorization(["admin"]), multerMiddleware(), leaveChatGroup);
// router.delete("/groups", jwtAuthentication, userAuthorization(["admin"]), deleteChatGroup);
// router.get("/groups/media", getChatGroupImage);

module.exports = router;
