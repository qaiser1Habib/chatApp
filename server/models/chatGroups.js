const mongoose = require("mongoose");

const chatGroupSchema = mongoose.Schema(
	{
		title: { type: String, required: true },
		description: String,
		members: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
		admin: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
		invites: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
		requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
		media: { filename: String, mimetype: String },
		isGroupChat: { type: Boolean, default: false },
		latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "chatMessages" },
		createdBy: String,
		updateBy: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("chatGroups", chatGroupSchema);
