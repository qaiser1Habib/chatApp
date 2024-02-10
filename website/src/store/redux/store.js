import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import userReducer from "./user";
import chatReducer from "./chat";
import notificationReducer from "./notification";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		user: userReducer,
		chat: chatReducer,
		notification: notificationReducer,
	},
});
