const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true, unique: true },
		userRole: { type: String, default: "user", enum: ["user", "admin"] },
		profileImage: {
			type: String,
			default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("user", userSchema);
