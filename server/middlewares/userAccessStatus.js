const users = require("../models/users.js");
const { sendJsonResponse } = require("../utils/helpers.js");

exports.userAccessStatus = () => {
	return (request, response, next) => {
		const { userRole, userID } = request.jwtPayload;

		if (userRole === "photographer") {
			const userDBPayload = users?.findOne({ userID: userID }).populate("subscription.subscriptionPlanID");

			if (userDBPayload?._id) {
				if (userDBPayload?.subscription?.subscriptionPlanID) {
					if (new Date(userDBPayload?.subscription?.expiryDate) > new Date()) {
						if (
							(userDBPayload?.subscription?.paymentStatus === "paid" && userDBPayload?.subscription?.isActive) ||
							userDBPayload?.subscription?.isActiveByAdmin ||
							userDBPayload?.subscription?.duration === "lifetime"
						) {
							next();
						} else {
							return sendJsonResponse(response, HTTP_STATUS_CODES.NOT_ACCEPTABLE, false, "Subscription InActive!", null);
						}
					} else {
						return sendJsonResponse(response, HTTP_STATUS_CODES.NOT_ACCEPTABLE, false, "Subscription Expired!", null);
					}
				} else {
					return sendJsonResponse(response, HTTP_STATUS_CODES.NOTFOUND, false, "Subscription Not Found!", null);
				}
			} else {
				return sendJsonResponse(response, HTTP_STATUS_CODES.NOTFOUND, false, "No UserID in JWT Payload!", null);
			}
		} else {
			next();
		}
	};
};
