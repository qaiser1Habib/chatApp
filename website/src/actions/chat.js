import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../middlewares/apis";
import { apiErrorHandler } from "./apiErrorHandler";

export const getGroupMessages = createAsyncThunk("chat/messages/fetchAllMessage", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.fetchAllMessage(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});
export const getUserAllMessages = createAsyncThunk("chat/userAllMessages/fetchAllUsersMessage", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.fetchAllUserMessage(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});

export const sendMessage = createAsyncThunk("chat/messages/sendMessage", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.sendMessage(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});

export const deleteChatMessage = createAsyncThunk("chat/message/delete", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.deleteChatMessage(formData);

		if (payload) {
			notify("success", "Message Deleted");
			return payload;
		}
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});

export const getChatGroups = createAsyncThunk("chat/groups/fetchAll", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.getChatGroups(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});

export const createChatGroup = createAsyncThunk("chat/createGroup", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.createGroup(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});

export const updateChatGroup = createAsyncThunk("chat/groups/update", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.updateChatGroup(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});

export const leaveChatGroup = createAsyncThunk("chat/groups/leave", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.leaveChatGroup(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});

export const deleteChatGroup = createAsyncThunk("chat/groups/delete", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.deleteChatGroup(formData);

		if (payload) {
			notify("success", "Group deleted");
			return payload;
		}
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});

export const reportMessage = createAsyncThunk("chat/groups/messages/report", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.reportMessage(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});

export const accessToChat = createAsyncThunk("chat/selectedChat/accessChat", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.accessChat(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});
export const getLoggedInUserChat = createAsyncThunk("chat/userChats/fetchChats", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.fetchChats(formData);

		if (payload) return payload;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});
