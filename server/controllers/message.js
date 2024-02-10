const Chat = require("../models/chat");
const User = require("../models/user");
const Message = require("../models/message");
const { sendJsonResponse } = require("../utils/helpers");

const saveAndSendMessage = async (io, socket, message) => {
	let chatMessage = null;

	try {
		if (!message?.type) return;

		switch (message.type) {
			case "text":
				chatMessage = {
					type: message?.type,
					sender: message?.sender,
					content: message?.content,
					chat: message?.chatId,
					// message: message?.message,
					// sender: message?.sender,
					// group: message?.groupID,
					// receiver: message?.receiver,
				};
				break;

			case "media":
				// const generatedFileName = generateUniqueFileName(file, filePath);
				const fileFullPath = path.join(chatMediaPath, message?.media?.filename);
				await fs.promises.writeFile(fileFullPath, message?.media?.file);

				chatMessage = {
					type: message?.type,
					media: { mimetype: message?.media?.mimeType, filename: message?.media?.filename },
					sender: message?.sender,
					group: message?.groupID,
					receiver: message?.receiver,
				};
				break;

			default:
				break;
		}

		var createdPayload = await Message.create(chatMessage);
		createdPayload = await createdPayload.populate("sender", "name profileImage");
		createdPayload = await createdPayload.populate("chat");
		createdPayload = await User.populate(message, { path: "chat.user", select: "name profileImage" });

		if (!createdPayload) throw new Error("Failed to save chat message");

		const socketsToSendMessage = Object.entries(io.activeSockets)
			.filter(
				([socketID, data]) =>
					data.roomID === createdPayload?.group?.toString() || data.userID === createdPayload?.sender?.toString()
			)
			.map(([socketID]) => socketID);
		for (let socketID of socketsToSendMessage) {
			io.to(socketID).emit("receive-message", createdPayload);
		}

		if (createdPayload?.group) {
			const { members, admins } = await chatGroups.findOne({ _id: createdPayload.group }, { members: 1, admins: 1, _id: 0 });

			const allGroupMembersToSendNotification = [
				...new Set([...members.map((id) => id.toString()), ...admins.map((id) => id.toString())]),
			].filter((memberID) => !socketsToSendMessage.some((socketID) => io.activeSockets[socketID].userID === memberID));

			for (let groupMember of allGroupMembersToSendNotification) {
				const notificationPayload = await createUserNotification({
					user: groupMember,
					type: "message",
					message: {
						type: "group",
						message: "Message",
						sender: createdPayload?.sender,
						group: createdPayload?.group,
					},
				});

				if (notificationPayload) {
					const socketToSendNotification = Object.keys(io.activeSockets).find(
						(socketID) => io.activeSockets[socketID].userID === groupMember
					);

					if (socketToSendNotification) {
						io.to(socketToSendNotification).emit("receive-notification", {
							type: "info",
							message: `New message received.`,
						});
					}
				}
			}
		}
	} catch (error) {
		console.error(error);
	}
};

const sendMessage = async (request, response) => {
	const { content, chatId } = request?.body;
	if (!content || !chatId) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!");
	}

	var newMessage = {
		sender: request.jwtPayload.userID,
		content: content,
		chat: chatId,
	};

	try {
		var message = await Message.create(newMessage);
		message = await message.populate("sender", "name profileImage");
		message = await message.populate("chat");
		message = await User.populate(message, { path: "chat.user", select: "name profileImage" });

		await Chat.findByIdAndUpdate(chatId, { latestMessage: message });
		return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "success", message);
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error occurred!", {
			error: error.message || error,
		});
	}
};

const allMessages = async (request, response) => {
	const { chatId } = request?.query;
	if (!chatId) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!");
	}
	try {
		const messages = await Message.find({ chat: chatId }).populate("sender", "name profileImage email").populate("chat");
		return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "success", messages);
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error occurred!", {
			error: error.message || error,
		});
	}
};


module.exports = {
	sendMessage,
	allMessages,
	saveAndSendMessage,
};
