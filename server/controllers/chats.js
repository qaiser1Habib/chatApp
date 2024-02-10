const user = require("../models/user.js");
const chatMessages = require("../models/chatMessages");
const chatGroups = require("../models/chatGroups.js");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const { sendJsonResponse, convertImageToWebp, generateUniqueFileName } = require("../utils/helpers.js");
// const { createUserNotification } = require("./userNotifications.js");
const userNotifications = require("../models/userNotifications.js");
const placeholderImage = path.join(__dirname, "../assets/images/placeholder.webp");
const filePath = path.join(__dirname, "../assets/images/chatGroups");
const chatMediaPath = path.join(__dirname, "../assets/images/chatMessages");

const getChatGroups = async (request, response) => {
	let query = {};

	try {
		const { userID: authenticatingUserID } = request?.jwtPayload;

		const { _id: chatGroupID, page, limit, includePublicGroups, searchKey } = request.query;

		if (!chatGroupID && (!page || !limit)) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!", null);
		}

		const userDBPayload = await user.findOne({ _id: authenticatingUserID });

		if (userDBPayload.userRole !== "admin") {
			if (chatGroupID) {
				query._id = chatGroupID;
			} else if (includePublicGroups && authenticatingUserID) {
				query.$or = [{ groupType: "public" }, { members: authenticatingUserID }, { admins: authenticatingUserID }];
			} else if (authenticatingUserID) {
				query.$or = [{ members: authenticatingUserID }, { admins: authenticatingUserID }];
			} else if (includePublicGroups) {
				query.groupType = "public";
			}
		}

		if (searchKey) query.title = new RegExp(searchKey, "i");

		const dbChatGroups = await chatGroups
			.find(query)
			.limit(limit)
			.skip(page && (page - 1) * limit);

		if (dbChatGroups.length) {
			return sendJsonResponse(
				response,
				HTTP_STATUS_CODES.OK,
				true,
				"Record Found!",
				chatGroupID ? dbChatGroups[0] : dbChatGroups
			);
		} else {
			return sendJsonResponse(response, HTTP_STATUS_CODES.NOTFOUND, false, "Record not Found!", null);
		}
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error!", {
			error: error?.message || error,
		});
	}
};

const getChat = async (request, response) => {
	try {
		const { userID: authenticatingUserID } = request?.jwtPayload;
		if (authenticatingUserID) {
			let getChat = await chatGroups
				.find({ members: { $elemMatch: { $eq: request.jwtPayload.userID } } })
				.populate("members", "-password")
				.populate("admin", "-password")
				.populate("latestMessage")
				.sort({ updatedAt: -1 });

			if (getChat) {
				getChat = await user.populate(getChat, {
					path: "latestMessage.sender",
					select: "name profileImage email",
				});
				return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "success", getChat);
			} else {
				return sendJsonResponse(response, HTTP_STATUS_CODES.NOTFOUND, true, "No Record found", getChat);
			}
		} else {
			return sendJsonResponse(response, HTTP_STATUS_CODES.UNAUTHORIZED, true, "Access! denied", null);
		}
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error occurred!", {
			error: error.message || error,
		});
	}
};
const saveAndSendMessage = async (io, socket, message) => {
	let chatMessage = null;
	try {
		if (!message?.type) return;

		switch (message.type) {
			case "text":
				chatMessage = new chatMessages({
					type: message?.type,
					message: message?.message,
					sender: message?.sender,
					chat: message?.chatId,
					receiver: message?.receiver,
				});
				break;

			case "media":
				// const generatedFileName = generateUniqueFileName(file, filePath);
				const fileFullPath = path.join(chatMediaPath, message?.media?.filename);
				await fs.promises.writeFile(fileFullPath, message?.media?.file);

				chatMessage = new chatMessages({
					type: message?.type,
					media: { mimetype: message?.media?.mimeType, filename: message?.media?.filename },
					sender: message?.sender,
					group: message?.groupID,
					receiver: message?.receiver,
				});
				break;

			default:
				break;
		}

		const createdPayload = await chatMessage.save();
		if (!createdPayload) throw new Error("Failed to save chat message");

		// const socketsToSendMessage = Object.entries(io.activeSockets)
		// 	.filter(
		// 		([socketID, data]) =>
		// 			data.roomID === createdPayload?.group?.toString() || data.userID === createdPayload?.sender?.toString()
		// 	)
		// 	.map(([socketID]) => socketID);
		// console.log(socketsToSendMessage);
		// for (let socketID of socketsToSendMessage) {
		// 	io.to(socketID).emit("receive-message", createdPayload);
		// }

		// if (createdPayload?.group) {
		// 	const { members, admins } = await chatGroups.findOne({ _id: createdPayload.group }, { members: 1, admins: 1, _id: 0 });

		// 	const allGroupMembersToSendNotification = [
		// 		...new Set([...members.map((id) => id.toString()), ...admins.map((id) => id.toString())]),
		// 	].filter((memberID) => !socketsToSendMessage.some((socketID) => io.activeSockets[socketID].userID === memberID));

		// 	for (let groupMember of allGroupMembersToSendNotification) {
		// 		const notificationPayload = await createUserNotification({
		// 			user: groupMember,
		// 			type: "message",
		// 			message: {
		// 				type: "group",
		// 				message: "Message",
		// 				sender: createdPayload?.sender,
		// 				group: createdPayload?.group,
		// 			},
		// 		});

		// 		if (notificationPayload) {
		// 			const socketToSendNotification = Object.keys(io.activeSockets).find(
		// 				(socketID) => io.activeSockets[socketID].userID === groupMember
		// 			);

		// 			if (socketToSendNotification) {
		// 				io.to(socketToSendNotification).emit("receive-notification", {
		// 					type: "info",
		// 					message: `New message received.`,
		// 				});
		// 			}
		// 		}
		// 	}
		// }
	} catch (error) {
		console.error(error);
	}
};

const sendMessage = async (request, response) => {
	const { message, chatId, type, receiver, sender } = request?.body;
	if (!message || !chatId) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!");
	}

	var newMessage = {
		sender: request.jwtPayload.userID,
		message: message,
		chat: chatId,
		type: type,
		receiver: receiver,
	};

	try {
		var DbMessage = await chatMessages.create(newMessage);
		DbMessage = await DbMessage.populate("sender", "name profileImage");
		DbMessage = await DbMessage.populate("chat");
		DbMessage = await user.populate(DbMessage, { path: "chat.members", select: "name profileImage" });
		await chatGroups.findByIdAndUpdate(chatId, { latestMessage: DbMessage });
		return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "success", DbMessage);
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error occurred!", {
			error: error.message || error,
		});
	}
};

const createChatGroup = async (request, response) => {
	try {
		const payload = request.body;
		const { userID: authenticatingUserID } = request.jwtPayload;
		const files = request.files;

		if (!payload?.title || !payload?.members?.length) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!", null);
		}

		if (files?.length) {
			let file = files[0];
			if (file.mimetype.startsWith("image")) file = await convertImageToWebp(file);

			const generatedFileName = generateUniqueFileName(file, filePath);
			const fileFullPath = path.join(filePath, generatedFileName);

			await fs.promises.writeFile(fileFullPath, file.buffer);
			payload.media = { mimetype: file.mimetype, filename: generatedFileName };
		}

		if (payload.members.length < 2) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "more than 2 users required to create a group!");
		} else {
			payload.members.push(request.jwtPayload.userID);
		}

		payload.admin = [authenticatingUserID];
		payload.members = Array.isArray(payload.members) ? payload.members : JSON.parse(payload.members);

		const chatGroup = new chatGroups({
			...payload,
			isGroupChat: true,
			createdBy: authenticatingUserID,
			updatedBy: authenticatingUserID,
		});

		const newChatGroup = await chatGroup.save();

		if (newChatGroup) {
			const fullGroupChat = await chatGroups
				.findOne({ _id: newChatGroup._id })
				.populate("members", "-password")
				.populate("admin", "-password");
			return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "Record created::success", fullGroupChat);
		} else {
			return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Record created::failure", null);
		}
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error!", {
			error: error?.message || error,
		});
	}
};

const accessChat = async (request, response) => {
	const { userId } = request.body;
	if (!userId) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!");
	}

	let isChat = await chatGroups
		.find({
			isGroupChat: false,
			$and: [{ members: { $elemMatch: { $eq: request.jwtPayload.userID } } }, { members: { $elemMatch: { $eq: userId } } }],
		})
		.populate("members", "-password")
		.populate("latestMessage");

	isChat = await user.populate(isChat, {
		path: "latestMessage.sender",
		select: "name profileImage email",
	});

	if (isChat.length > 0) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "success", isChat[0]);
	} else {
		var chatData = {
			title: "sender",
			isGroupChat: false,
			members: [request.jwtPayload.userID, userId],
		};
	}
	try {
		const createdChat = await chatGroups.create(chatData);
		const fullChat = await chatGroups.findOne({ _id: createdChat._id }).populate("members", "-password");
		return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "success", fullChat);
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error occurred!", {
			error: error.message || error,
		});
	}
};

const getAllMessages = async (request, response) => {
	const { chatId } = request?.query;
	if (!chatId) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!");
	}
	try {
		const messages = await chatMessages
			.find({ chat: chatId })
			.populate("sender", "name profileImage email")
			.populate("chat")
			.sort({ createdAt: 1 });
		return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "success", messages);
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error occurred!", {
			error: error.message || error,
		});
	}
};

const allMessagesForUser = async (request, response) => {
	const { userId } = request.query;
	if (!userId) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!");
	}
	try {
		// Find all chats where the user is a member
		const userChats = await chatGroups.find({ members: userId });
		// Extract chat IDs
		const chatIds = userChats.map((chat) => chat._id);

		// Find all messages for the user's chats
		const messages = await chatMessages
			.find({ chat: { $in: chatIds } })
			.populate("sender", "name profileImage email")
			.populate("chat");

		return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "Success", messages);
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error occurred!", {
			error: error.message || error,
		});
	}
};

module.exports = {
	getChatGroups,
	getChat,
	saveAndSendMessage,
	createChatGroup,
	accessChat,
	getAllMessages,
	sendMessage,
	allMessagesForUser,
};
