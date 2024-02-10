import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "./store/hooks/useToast";
import { userLoggedIn } from "./store/redux/auth.js";
import { verifyUserLogin } from "./actions/auth.js";
import { getLoginUserInfo } from "./actions/user.js";
import { useSocket } from "./store/hooks/useSocket.js";
import { selectLogInUserInfo } from "./store/redux/user.js";
import { selectedUserChat, setOnlineUsers, setUserAllMessages } from "./store/redux/chat.js";
import { setNotification } from "./store/redux/notification.js";
import { getUserAllMessages } from "./actions/chat.js";

const LazyComponents = {
	Home: lazy(() => import("./views/Home.jsx")),
	Register: lazy(() => import("./views/component/auth/Register.jsx")),
	Login: lazy(() => import("./views/component/auth/Login.jsx")),
	ForgotPassword: lazy(() => import("./views/component/auth/Forgot.jsx")),
};
const LoadingComponent = (
	<div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
		<div className="spinner-border text-secondary" role="status">
			<span className="visually-hidden">Loading...</span>
		</div>
	</div>
);
const ProtectedRoute = ({ authStatus }) => {
	return authStatus === true ? <Outlet /> : authStatus === false ? <Navigate to="/" /> : null;
};

const GuestRoute = ({ authStatus }) => {
	return authStatus === true ? <Navigate to="/chat" /> : authStatus === false ? <Outlet /> : null;
};
function App() {
	const loggedIn = useSelector(userLoggedIn || false);
	const user = useSelector(selectLogInUserInfo || null);
	const [authStatus, setAuthStatus] = useState(null);
	const dispatch = useDispatch();
	const { notify } = useToast();
	const socket = useSocket();
	const userSelectedChat = useSelector(selectedUserChat);

	useEffect(() => {
		dispatch(verifyUserLogin(notify)).then(() => {
			setAuthStatus(loggedIn && true);
			if (loggedIn) {
				dispatch(getLoginUserInfo({ formData: null, notify }));
			}
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loggedIn]);

	useEffect(() => {
		if (user._id) {
			dispatch(getUserAllMessages({ formData: { userId: user._id }, notify }));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, loggedIn]);

	useEffect(() => {
		if (user?._id && socket) {
			socket.emit("user-connected", user?._id);
			socket.on("getOnlineUsers", (onlineUser) => {
				dispatch(setOnlineUsers(onlineUser));
			});
		}
		return () => {
			socket.off("getOnlineUsers");
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [socket, user]);
	useEffect(() => {
		if (socket === null) return;
		socket.on("getNotification", (notification) => {
			let isChatOpen = false;
			isChatOpen = userSelectedChat?.members.some((user) => user._id === notification.sender._id);
			if (isChatOpen) {
				dispatch(setNotification({ ...notification, isRead: true }));
				isChatOpen = false;
			} else {
				dispatch(setNotification(notification));
				console.log(notification?.message);
				dispatch(setUserAllMessages(notification.message));
			}
		});

		return () => {
			socket.off("getNotification");
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [socket, userSelectedChat]);

	return (
		<div className="d-flex flex-column " style={{ minHeight: "100vh" }}>
			<Suspense fallback={LoadingComponent}>
				<Routes>
					{/* Guest routes for users not logged in */}
					<Route path="/" element={<GuestRoute authStatus={authStatus} />}>
						<Route path="/" element={<LazyComponents.Login />} />
						<Route path="/register" element={<LazyComponents.Register />} />
						<Route path="/forgot-password" element={<LazyComponents.ForgotPassword />} />
					</Route>

					{/* Protected routes for logged in users */}
					<Route path="/" element={<ProtectedRoute authStatus={authStatus} />}>
						<Route path="/chat" element={<LazyComponents.Home />} />
					</Route>
					{/* <Route path="*" element={<LazyComponents.NotFound />} /> */}
				</Routes>
			</Suspense>
		</div>
	);
}

export default App;
