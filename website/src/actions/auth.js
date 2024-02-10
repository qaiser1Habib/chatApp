import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../middlewares/apis";
import { apiErrorHandler } from "./apiErrorHandler";
import { getToken, setToken } from "../middlewares/auth";

export const registerUser = createAsyncThunk("auth/registerUser", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.registerUser(formData);
		if (payload) {
			notify("success", "User successfully Registered. Now you can login");
			return payload;
		}
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});

export const loginUser = createAsyncThunk("auth/loginUser", async ({ formData, notify }, { dispatch }) => {
	try {
		const { payload } = await api.loginUser(formData);
		if (payload.token) {
			await setToken(payload.token);
			notify("success", "Login successful");
			return true;
		}
	} catch (error) {
		if (error.message) {
			notify("warning", error?.message ? error.message : "Invalid Login Credentials!");
		}
	}
});

export const verifyUserLogin = createAsyncThunk("auth/verifyLogin", async (notify, { dispatch }) => {
	try {
		const payload = getToken();
		return payload ? true : false;
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});
export const logoutUser = createAsyncThunk("auth/logout", async (notify, { dispatch }) => {
	try {
		notify("success", "logout successful");
		localStorage.clear();
		return { payload: "successfully logout" };
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});
