const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { createServer } = require("http");
require("./utils/constants.js");
require("dotenv").config();
const { Server } = require("socket.io");

const userRouter = require("./routes/user.js");
const chatRouter = require("./routes/chat.js");
const messageRouter = require("./routes/message.js");
const app = express();
const httpServer = createServer(app);

//middlewares
app.use(express.json());
// // CORS configuration

const corsOptions = {
	origin: "http://localhost:5173",
	credentials: true,
};

// app.use(cors(corsOptions));
app.use(cors());

main().catch((err) => console.log(err));

async function main() {
	await mongoose.connect(process.env.MONGO_DB_CONNECTION_URL);
	console.log("database connected");
}

const io = new Server(httpServer, { maxHttpBufferSize: 1e8, cors: corsOptions });
require("./middlewares/sockets")(io); // Assuming this sets up your socket.io middleware

app.use("/user", userRouter.router);
app.use("/chat", chatRouter.router);
app.use("/message", messageRouter.router);
app.use("/v1/chats", require("./routes/chats.js"));

// Welcome route
app.get("/", (req, res) => {
	res.send("Welcome to the server");
});

httpServer.listen(process.env.PORT, () => {
	console.log(`Example app listening on port ${process.env.PORT}`);
});

// const io = require("socket.io")(server, {
// 	pingTimeout: 60000,
// 	cors: {
// 		origin: "http://localhost:5173",
// 	},
// });

// io.on("connection", (socket) => {
// 	console.log("connected to socket.io");

// 	socket.on("setup", (userData) => {
// 		socket.join(userData?._id);
// 		socket.emit("connected");
// 	});
// 	socket.on("join chat", (room) => {
// 		socket.join(room);
// 		console.log(`user join room: ${room}`);
// 	});
// 	socket.on("new message", (newMessageReceived) => {
// 		console.log(newMessageReceived);
// 		var chat = newMessageReceived?.chat;
// 		if (!chat?.users) return;
// 		chat.users.forEach((user) => {
// 			if (user?._id == newMessageReceived?.sender?._id) return;

// 			socket.in(user?._id).emit("message received", newMessageReceived);
// 		});
// 	});
// });
