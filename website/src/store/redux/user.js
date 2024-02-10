import { createSlice } from "@reduxjs/toolkit";
import { getLoginUserInfo, getSearchUsersInfo } from "../../actions/user";

const initialState = {
	userInfo: {},
	searchUsersInfo: [],
	status: "idle",
};
export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		clearSearchUsers(state) {
			state.searchUsersInfo = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getLoginUserInfo.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getLoginUserInfo.fulfilled, (state, action) => {
				state.status = "idle";
				state.userInfo = action?.payload || {};
			})
			.addCase(getSearchUsersInfo.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getSearchUsersInfo.fulfilled, (state, action) => {
				state.status = "idle";
				state.searchUsersInfo = action?.payload || [];
			});
	},
});
export const { clearSearchUsers } = userSlice.actions;
export const selectLogInUserInfo = (state) => state.user?.userInfo;
export const selectSearchUsersInfo = (state) => state.user.searchUsersInfo;

export default userSlice.reducer;
