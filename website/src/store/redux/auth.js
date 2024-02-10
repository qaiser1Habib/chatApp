import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, verifyUserLogin } from "../../actions/auth";
const initialState = {
	isLoginUser: false,
	status: "idle",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.status = "loading";
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoginUser = action?.payload || false;
			})
			.addCase(loginUser.pending, (state) => {
				state.status = "loading";
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoginUser = action?.payload || false;
			})
			.addCase(verifyUserLogin.pending, (state) => {
				state.status = "loading";
			})
			.addCase(verifyUserLogin.fulfilled, (state, action) => {
				state.isLoginUser = action?.payload || false;
			});
	},
});
export const userLoggedIn = (state) => state.auth.isLoginUser;

export default authSlice.reducer;
