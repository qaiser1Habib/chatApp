const {
	saveAndSendMessage,
	getSenderOfMessage,
	updateAndSendMessage,
	saveAndSendGroupRequest,
	updateAndSendGroupRequestUpdate,
} = require("../controllers/chats");

module.exports = (io) => {
	let onlineUsers = [];
	io.on("connection", (socket) => {
		console.log("new user connected", socket.id);

		socket.on("user-connected", (userID) => {
			console.log({ userID });
			!onlineUsers.some((user) => user.userID === userID) &&
				onlineUsers.push({
					userID,
					socketID: socket.id,
				});
			io.emit("getOnlineUsers", onlineUsers);
		});

		socket.on("sendMessage", (message) => {
			const user = onlineUsers.find((user) => user?.userID === message.receiver?._id);
			if (user) {
				io.to(user.socketID).emit("getMessage", message);
				io.to(user.socketID).emit("getNotification", {
					sender: message?.sender,
					chat: message?.chat,
					message: message,
					isRead: false,
					date: new Date(),
				});
			}
		});

		socket.on("disconnect", () => {
			onlineUsers = onlineUsers.filter((user) => user.socketID !== socket.id);
			io.emit("getOnlineUsers", onlineUsers);
		});
	});
};
