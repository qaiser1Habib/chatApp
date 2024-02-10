const mongoose = require("mongoose");
const { Schema } = mongoose;

const MessageSchema = new Schema(
	{
		type: { type: String, enum: ["text", "media", "file"], default: "text" },
		sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		content: { type: String, trim: true },
		chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
	},
	{
		timestamps: true,
	}
);
module.exports = mongoose.model("Message", MessageSchema);
