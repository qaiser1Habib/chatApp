// // const subscriptions = require("../models/subscriptions.js");
// const users = require("../models/user.js");
// // const userPortfolios = require("../models/userPortfolios.js");

// const fs = require("fs");
// const path = require("path");
// const sharp = require("sharp");

// var nodemailer = require("nodemailer");
// var handlebars = require("handlebars");
// const products = require("../models/products.js");

// const generateRandomNumber = (numberLength) => {
// 	return Math.floor(Math.random() * (9 * Math.pow(10, numberLength - 1))) + Math.pow(10, numberLength - 1);
// };

// const addMinutesToDate = (date, minutes) => {
// 	return new Date(date.getTime() + minutes * 60000);
// };

// const Sleep = (time) => {
// 	return new Promise((resolve) => setTimeout(resolve, time));
// };

const sendJsonResponse = (response, httpCode, status = false, message = "No Message To Show!", payload = null) => {
	return response.status(HTTP_STATUS_CODES.OK).json({
		httpCode,
		status,
		message,
		payload,
	});
};

// const convertMillisecondsToTimeFormat = (milliseconds) => {
// 	const portions = [];

// 	const msInHour = 1000 * 60 * 60;
// 	const hours = Math.trunc(milliseconds / msInHour);
// 	if (hours > 0) {
// 		portions.push(hours + "h");
// 		milliseconds = milliseconds - hours * msInHour;
// 	}

// 	const msInMinute = 1000 * 60;
// 	const minutes = Math.trunc(milliseconds / msInMinute);
// 	if (minutes > 0) {
// 		portions.push(minutes + "m");
// 		milliseconds = milliseconds - minutes * msInMinute;
// 	}

// 	const seconds = Math.trunc(milliseconds / 1000);
// 	if (seconds > 0) {
// 		portions.push(seconds + "s");
// 	}

// 	return portions.join(" ");
// };

// const convertImageToWebp = async (file) => {
// 	try {
// 		const outputBuffer = await sharp(file.buffer).webp({ quality: 90 }).toBuffer();
// 		if (outputBuffer) {
// 			file.originalname = path.basename(file.originalname, path.extname(file.originalname)) + ".webp";
// 			file.mimetype = "image/webp";
// 		}

// 		return file;
// 	} catch (error) {
// 		throw error;
// 	}
// };

// const generateUniqueFileName = (file, filePath) => {
// 	let fileName = null;
// 	let isFileAlreadyExists = false;

// 	do {
// 		const uniqueFileID = generateRandomNumber(10);
// 		const currentTimestamp = new Date().toISOString().replace(/[-:.]/g, "");
// 		const sanitizedFileName = file.originalname
// 			.split(".")
// 			.slice(0, -1)
// 			.join()
// 			.replace(/[_\s,.]/g, "-");
// 		const fileExtension = file.originalname.split(".").pop();

// 		fileName = `${uniqueFileID}-${currentTimestamp}-${sanitizedFileName}.${fileExtension}`;
// 		isFileAlreadyExists = fs.existsSync(path.join(filePath, fileName));
// 	} while (isFileAlreadyExists);

// 	return fileName;
// };

// const sendEmail = async (receiver, replacements, template) => {
// 	let emailResponse = null;
// 	let emailTemplate = null;

// 	try {
// 		const transporter = nodemailer.createTransport({
// 			host: process.env.SMTP_HOST,
// 			secure: false,
// 			port: 587,
// 			auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
// 		});

// 		emailTemplate = fs.readFileSync(path.join(__dirname, "/../utils/emailTemplates/" + template), "utf-8").toString();
// 		emailTemplate = handlebars.compile(emailTemplate);
// 		const htmlToSend = emailTemplate(replacements);

// 		var mailOptions = {
// 			from: "picfan@daffi.me",
// 			to: receiver,
// 			subject: replacements?.subject || "",
// 			html: htmlToSend,
// 		};

// 		await transporter.sendMail(mailOptions).then((data, error) => {
// 			if (error) throw error;
// 			else if (data) emailResponse = data;
// 		});

// 		return emailResponse;
// 	} catch (error) {
// 		return error?.message;
// 	}
// };

// const getRemainingLimitsForUserSubscriptionPlan = async (userID, tableName) => {
// 	let count = 0;

// 	try {
// 		if (!userID || !tableName) return null;

// 		const userPayload = await users.findOne({ _id: userID }, { _id: 0, "subscription.subscriptionPlanID": 1 });

// 		if (userPayload?.subscription?.subscriptionPlanID) {
// 			const subscriptionPayload = await subscriptions.findOne({ _id: userPayload.subscription.subscriptionPlanID });

// 			if (subscriptionPayload?._id) {
// 				switch (tableName) {
// 					case "userPortfolios":
// 						count = await userPortfolios.find({ userID: userID }).count();
// 						return subscriptionPayload?.portfolio?.maxImagesAllowed - count;

// 					case "products":
// 						count = await products.find({ sellerID: userID }).count();
// 						return subscriptionPayload?.portfolio?.maxImagesAllowed - count;

// 					default:
// 						return 0;
// 				}
// 			} else return null;
// 		} else return null;
// 	} catch (error) {
// 		return error;
// 	}
// };

module.exports = {
	sendJsonResponse,
	// generateRandomNumber,
	// addMinutesToDate,
	// Sleep,
	// convertMillisecondsToTimeFormat,
	// convertImageToWebp,
	// generateUniqueFileName,
	// sendEmail,
	// getRemainingLimitsForUserSubscriptionPlan,
};
