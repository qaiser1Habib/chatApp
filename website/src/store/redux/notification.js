import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	notification: [],
	status: "idle",
};

const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		setNotification: (state, action) => {
			state.notification.push(action?.payload || []);
		},
		setNotificationAsRead: (state, action) => {
			state.notification = action?.payload || [];
		},
	},
	extraReducers: (builder) => {
		builder;
	},
});
export const { setNotification, setNotificationAsRead } = notificationSlice.actions;

export const userNotifications = (state) => state.notification.notification;

export default notificationSlice.reducer;
