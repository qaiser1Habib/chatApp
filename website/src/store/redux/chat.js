import { createSlice } from "@reduxjs/toolkit";
import {
	accessToChat,
	createChatGroup,
	getGroupMessages,
	getLoggedInUserChat,
	getUserAllMessages,
	sendMessage,
	// createChatGroup,
	// deleteChatGroup,
	// getChatGroups,
	// getGroupMessages,
	// reportMessage,
	// updateChatGroup,
} from "../../actions/chat";

const initialState = {
	messages: [],
	userAllMessages: [],
	userChats: [],
	onlineUsers: [],
	selectedChat: null,
};

export const userChatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		setSelectedChat: (state, action) => {
			state.selectedChat = action.payload;
		},
		setMessages: (state, action) => {
			state.messages.push(action?.payload);
		},
		setUserAllMessages: (state, action) => {
			state.userAllMessages.push(action?.payload);
		},
		setOnlineUsers: (state, action) => {
			state.onlineUsers = action?.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(accessToChat.fulfilled, (state, action) => {
			state.selectedChat = action?.payload || {};
		});
		builder.addCase(getLoggedInUserChat.fulfilled, (state, action) => {
			state.userChats = action?.payload || [];
		});
		builder
			.addCase(createChatGroup.fulfilled, (state, action) => {
				state.userChats.push(...state.userChats, action?.payload || []);
			})
			.addCase(getGroupMessages.fulfilled, (state, action) => {
				state.messages = action?.payload || [];
			})
			.addCase(sendMessage.fulfilled, (state, action) => {
				state.messages.push(action?.payload || []);
			})
			.addCase(getUserAllMessages.fulfilled, (state, action) => {
				state.userAllMessages = action?.payload || [];
			});
		// .addCase(accessToChat.fulfilled, (state, action) => {
		// 	state.selectedChat = action?.payload || null;
		// });
		// .addCase(getChatGroups.fulfilled, (state, action) => {
		// 	return { ...state, groups: action?.payload || [] };
		// })
		// .addCase(createChatGroup.fulfilled, (state, action) => {
		// 	return { ...state, groups: [...state.groups, action.payload] };
		// })
		// .addCase(updateChatGroup.fulfilled, (state, action) => {
		// 	const updatePayload = action.payload;
		// 	return { ...state, groups: state.groups.map((item) => (item._id === updatePayload._id ? updatePayload : item)) };
		// })
		// .addCase(deleteChatGroup.fulfilled, (state, action) => {
		// 	const deleteItemID = action?.payload?._id;
		// 	return { ...state, groups: state.groups.filter((item) => item._id !== deleteItemID) };
		// })
		// .addCase(reportMessage.fulfilled, (state, action) => {
		// 	const updatedPayload = action?.payload || {};
		// 	return {
		// 		...state,
		// 		messages: state.messages.map((item) => (item._id === updatedPayload?._id ? updatedPayload : item)),
		// 	};
		// });
	},
});
export const { setSelectedChat, setMessages, setOnlineUsers, setUserAllMessages } = userChatSlice.actions;
export const selectLoggedInUserChats = (state) => state.chat.userChats;
export const selectedUserChat = (state) => state.chat.selectedChat;
export const selectedUserMessages = (state) => state.chat.messages;
export const loggedInUserMessages = (state) => state.chat.userAllMessages;
export const selectOnlineUsers = (state) => state.chat.onlineUsers;

export default userChatSlice.reducer;
