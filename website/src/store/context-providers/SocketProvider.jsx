import { createContext, useEffect } from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = import.meta.env.VITE_APP_SOCKET_URL;
export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
	const socket = socketIOClient(ENDPOINT, { withCredentials: true });

	useEffect(() => {
		// Handling the connection directly
		socket.on("connect", () => {
			console.log("Connected to the server");
		});

		// Handling disconnection
		return () => {
			console.log("Disconnecting from the server");
			socket.disconnect();
		};
	}, [socket]); // Make sure to include socket in the dependency array

	return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
