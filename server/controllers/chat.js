const Chat = require("../models/chat");
const User = require("../models/user");
const ChatMessage = require("../models/message");

const { sendJsonResponse } = require("../utils/helpers");

const accessChat = async (request, response) => {
	const { userId } = request.body;
	if (!userId) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!");
	}

	let isChat = await Chat.find({
		isGroupChat: false,
		$and: [{ users: { $elemMatch: { $eq: request.jwtPayload.userID } } }, { users: { $elemMatch: { $eq: userId } } }],
	})
		.populate("users", "-password")
		.populate("latestMessage");

	isChat = await User.populate(isChat, {
		path: "latestMessage.sender",
		select: "name profileImage email",
	});

	if (isChat.length > 0) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "success", isChat[0]);
	} else {
		var chatData = {
			chatName: "sender",
			isGroupChat: false,
			users: [request.jwtPayload.userID, userId],
		};
	}
	try {
		const createdChat = await Chat.create(chatData);
		const fullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password");
		return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "success", fullChat);
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error occurred!", {
			error: error.message || error,
		});
	}
};

const fetchChats = async (request, response) => {
	try {
		let getChat = await Chat.find({ users: { $elemMatch: { $eq: request.jwtPayload.userID } } })
			.populate("users", "-password")
			.populate("groupAdmin", "-password")
			.populate("latestMessage")
			.sort({ updatedAt: -1 });

		if (getChat) {
			getChat = await User.populate(getChat, {
				path: "latestMessage.sender",
				select: "name profileImage email",
			});
			return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "success", getChat);
		} else {
			return sendJsonResponse(response, HTTP_STATUS_CODES.NOTFOUND, true, "No Record found", getChat);
		}
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error occurred!", {
			error: error.message || error,
		});
	}
};

const createGroupChats = async (request, response) => {
	const { users, name } = request.body;
	if ((!users, !name)) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!");
	}

	if (users.length < 2) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "more than 2 users required to create a group!");
	} else {
		users.push(request.jwtPayload.userID);
	}

	try {
		const groupChat = await Chat.create({
			chatName: name,
			users: users,
			isGroupChat: true,
			groupAdmin: request.jwtPayload.userID,
		});

		const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
			.populate("users", "-password")
			.populate("groupAdmin", "-password");
		return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "success", fullGroupChat);
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error occurred!", {
			error: error.message || error,
		});
	}
};
const renameGroupChat = async (request, response) => {
	const { chatId, name } = request.body;
	if (!name && !chatId) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!");
	}

	try {
		const UpdatedGroupName = await Chat.findByIdAndUpdate(
			chatId,
			{
				chatName: name,
			},
			{ new: true }
		)
			.populate("users", "-password")
			.populate("groupAdmin", "-password");

		return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "success", UpdatedGroupName);
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error occurred!", {
			error: error.message || error,
		});
	}
};

const addToGroup = async (request, response) => {
	const { chatId, userId } = request.body;
	if (!userId && !chatId) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!");
	}

	try {
		const addNewUser = await Chat.findByIdAndUpdate(
			chatId,
			{
				$push: {
					users: userId,
				},
			},
			{ new: true }
		)
			.populate("users", "-password")
			.populate("groupAdmin", "-password");
		if (addNewUser) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "success", addNewUser);
		} else {
			return sendJsonResponse(response, HTTP_STATUS_CODES.NOTFOUND, false, "failed!");
		}
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error occurred!", {
			error: error.message || error,
		});
	}
};
const deleteFromGroup = async (request, response) => {
	const { chatId, userId } = request.query;
	if (!userId && !chatId) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!");
	}
	try {
		const updatedChat = await Chat.findByIdAndUpdate(
			chatId,
			{
				$pull: {
					users: userId,
				},
			},
			{ new: true }
		)
			.populate("users", "-password")
			.populate("groupAdmin", "-password");
		if (updatedChat) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "success", updatedChat);
		} else {
			return sendJsonResponse(response, HTTP_STATUS_CODES.NOT_FOUND, false, "Chat not found");
		}
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error occurred!", {
			error: error.message || error,
		});
	}
};
module.exports = {
	accessChat,
	fetchChats,
	createGroupChats,
	renameGroupChat,
	addToGroup,
	deleteFromGroup,
};
