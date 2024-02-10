const mongoose = require("mongoose");

const chatMessageSchema = mongoose.Schema(
	{
		message: { type: String, trim: true },
		media: { filename: String, mimetype: String },
		type: { type: String, enum: ["text", "media", "file"], default: "text" },
		sender: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
		chat: { type: mongoose.Schema.Types.ObjectId, ref: "chatGroups" },
		receiver: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
		report: {
			type: { type: String, enum: ["spam", "inappropriate", "harassment"] },
			status: { type: String, enum: ["pending", "warned", "resolved"] },
			reporter: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
			reason: String,
		},
		edited: { status: { type: Boolean, default: false }, date: Date },
		deleted: { status: { type: Boolean, default: false }, date: Date },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("chatMessages", chatMessageSchema);
