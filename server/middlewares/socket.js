const {
	saveAndSendMessage,
	updateAndSendMessage,
	saveAndSendGroupRequest,
	updateAndSendGroupRequestUpdate,
} = require("../controllers/chats");

module.exports = (io) => {
	io.activeSockets = {};
	io.on("connection", (socket) => {
		io.activeSockets[socket.id] = {};

		const updateSocketData = (key, value) => {
			if (io.activeSockets[socket.id]) {
				io.activeSockets[socket.id][key] = value;
			}
		};

		socket.on("user-connected", ({ userID }) => {
			// updateSocketData("userID", userID);
			console.log("user connected " + userID);
			socket.join(userID);
		});

		socket.on("joinRoom", ({ roomID }) => {
			socket.join(roomID);
			console.log(`user join ${roomID}`);
		});

		socket.on("leaveRoom", () => updateSocketData("roomID", null));

		socket.on("new-message", (createdPayload) => {
			var chat = createdPayload.chat;
			

			if (!chat.members) return console.log("chat.users not defined");

			chat.members.forEach((member) => {
				if (member._id == createdPayload.sender._id) return;

				socket.in(member._id).emit("receive-message", createdPayload);
			});
		});

		socket.on("send-message", async (payload) => {
			await saveAndSendMessage(io, socket, payload);
		});
		socket.on("edit-message", async (payload) => await updateAndSendMessage(io, socket, payload));

		socket.on("send-request", async (payload) => saveAndSendGroupRequest(io, socket, payload));
		socket.on("update-request", async (payload) => updateAndSendGroupRequestUpdate(io, socket, payload));

		socket.on("disconnect", () => {
			delete io.activeSockets[socket.id];
		});
	});
};
