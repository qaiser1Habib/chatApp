import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../middlewares/apis";
import { apiErrorHandler } from "./apiErrorHandler";

export const getLoginUserInfo = createAsyncThunk("user/getLoginUser", async ({ formData, notify }, { dispatch }) => {
	try {
		const response = await api.getLoginUser(formData);
		if (response) {
			return response?.payload;
		}
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});

export const getSearchUsersInfo = createAsyncThunk("user/getSearchUsers", async ({ formData, notify }, { dispatch }) => {
	try {
		const response = await api.getSearchUsers(formData);
		if (response) {
			return response?.payload;
		}
	} catch (error) {
		dispatch(apiErrorHandler(error, notify));
	}
});
