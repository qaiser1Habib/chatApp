import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/redux/store.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import { SocketProvider } from "./store/context-providers/SocketProvider.jsx";

ReactDOM.createRoot(document.getElementById("app")).render(
	<Provider store={store}>
		<SocketProvider>
			<ToastContainer />
			<Router>
				<App />
			</Router>
		</SocketProvider>
	</Provider>
);
