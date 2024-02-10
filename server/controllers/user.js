const User = require("../models/user");
const { sendJsonResponse } = require("../utils/helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const privateKEY = fs.readFileSync(path.join(__dirname, "../assets/encryptionKeys/privateKey.key"), "utf8");

const registerUser = async (request, response) => {
	try {
		const payload = request.body;
		if (!payload?.email || !payload?.password) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!", null);
		}
		const dbUser = await User.findOne({ email: payload?.email });

		if (dbUser) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.CONFLICT, false, "Record Already Exist!", null);
		} else {
			const hashedPassword = await bcrypt.hash(payload?.password, 12);
			const user = new User({ ...payload, password: hashedPassword });
			const newUser = await user.save();
			if (newUser) {
				return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "Record Created::Success", newUser);
			} else {
				return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Record Created::Failure", null);
			}
		}
	} catch (error) {}
};

const login = async (request, response) => {
	try {
		const { email, password, isAdminLogin } = request.body;
		if (!email && !password) {
			sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "missing parameters!", null);
		}
		const dbUser = await User.findOne({ email: email });
		if (dbUser) {
			if ((isAdminLogin && dbUser.userRole === "admin") || (!isAdminLogin && dbUser.userRole !== "admin")) {
				const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
				if (isPasswordMatched) {
					var token = jwt.sign(
						{
							username: dbUser.name,
							email: dbUser.email,
							userRole: dbUser.userRole,
							userID: dbUser._id,
						},
						privateKEY,
						LOGIN_TOKEN_PREFERENCES
					);

					if (token) {
						return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "Login::success", { token: token });
					} else {
						return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Login::failure", null);
					}
				} else {
					sendJsonResponse(response, HTTP_STATUS_CODES.UNAUTHORIZED, false, "Invalid Password!", null);
				}
			} else {
				return sendJsonResponse(response, HTTP_STATUS_CODES.UNAUTHORIZED, false, "Access denied!", null);
			}
		} else {
			sendJsonResponse(response, HTTP_STATUS_CODES.NOTFOUND, false, "No Record Found", null);
		}
	} catch (error) {}
};

const getUsers = async (request, response) => {
	const { search } = request.query;

	if (!search) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!");
	}

	let query = null;

	if (search) {
		query = {
			$or: [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }],
		};
	}

	try {
		const users = await User.find(query).find({ _id: { $ne: request.jwtPayload.userID } });

		const sanitizedUsers = users.map((user) => ({
			_id: user._id,
			name: user.name,
			email: user.email,
			profileImage: user.profileImage,
		}));

		return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "Records Found!", sanitizedUsers);
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error occurred!", {
			error: error.message || error,
		});
	}
};

const getLoggedInUser = async (request, response) => {
	try {
		const { userID } = request?.jwtPayload;
		if (!userID) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.UNAUTHORIZED, false, "Access denied!", null);
		}
		const dbUser = await User.findById(userID);
		const docs = {
			_id: dbUser.id,
			email: dbUser.email,
			role: dbUser.role,
			name: dbUser.name,
			addresses: dbUser.addresses,
			profileImage: dbUser.profileImage,
		};
		return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "Record Found", docs);
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error!", {
			error: error?.message || error,
		});
	}
};

module.exports = {
	registerUser,
	login,
	getUsers,
	getLoggedInUser,
};
