import { getToken } from "./auth";
import axiosHandler from "./axiosHandler";

let defaultHeaders = {
	"Content-Type": "application/json",
};
let multipartHeaders = {};

async function refreshAuthToken() {
	const authToken = await getToken();

	defaultHeaders = { Authorization: `Bearer ${authToken}`, "ngrok-skip-browser-warning": "69420" };
	multipartHeaders = { ...defaultHeaders, "Content-Type": "multipart/form-data" };
}

const apiMethods = {
	get: async (endpoint, formData) => {
		await refreshAuthToken();
		return axiosHandler.get(endpoint, { params: formData, headers: defaultHeaders });
	},
	post: async (endpoint, formData, isMultipart = false, uploadProgress) => {
		await refreshAuthToken();
		return axiosHandler.post(endpoint, formData, {
			headers: isMultipart ? multipartHeaders : defaultHeaders,
			onUploadProgress: uploadProgress,
		});
	},
	put: async (endpoint, formData, isMultipart = false, uploadProgress) => {
		await refreshAuthToken();
		return axiosHandler.put(endpoint, formData, {
			headers: isMultipart ? multipartHeaders : defaultHeaders,
			onUploadProgress: uploadProgress,
		});
	},
	patch: async (endpoint, formData, isMultipart = false, uploadProgress) => {
		await refreshAuthToken();
		return axiosHandler.patch(endpoint, formData, {
			headers: isMultipart ? multipartHeaders : defaultHeaders,
			onUploadProgress: uploadProgress,
		});
	},
	delete: async (endpoint, formData) => {
		await refreshAuthToken();
		return axiosHandler.delete(endpoint, { params: formData, headers: defaultHeaders });
	},
};

//post
export const registerUser = (formData) => apiMethods.post("/user/register", formData);
export const loginUser = (formData) => apiMethods.post("/user", formData);
export const accessChat = (formData) => apiMethods.post("/v1/chats/chat", formData);
export const createGroup = (formData) => apiMethods.post("/v1/chats/create-group", formData);
export const updateGroupUser = (formData) => apiMethods.post("/chat/add-user", formData);
export const sendMessage = (formData) => apiMethods.post("/v1/chats/chat-sendMsg", formData);

//get
export const getLoginUser = (formData) => apiMethods.get("/user/login-user", formData);
export const getSearchUsers = (formData) => apiMethods.get("/user", formData);
export const fetchChats = (formData) => apiMethods.get("/v1/chats/chat", formData);
export const fetchAllMessage = (formData) => apiMethods.get("/v1/chats/chat/get-messages", formData);
export const fetchAllUserMessage = (formData) => apiMethods.get("/v1/chats/chat-getUserMessages", formData);
//put
export const updateGroupName = (formData) => apiMethods.put("/chat", formData);
//patch
//delete
export const removeUserFromGroup = (formData) => apiMethods.delete("/chat/delete-user", formData);
