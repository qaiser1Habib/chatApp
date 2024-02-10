import Header from "./views/partials/Header";
import Footer from "./views/partials/Footer";

import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { lazy, Suspense, useState } from "react";

const LazyComponents = {
	Home: lazy(() => import("./views/Home")),
};
const LoadingComponent = (
	<div className="preloader">
		<div className="preloader-inner">
			<svg width="88px" height="108px" viewBox="0 0 54 64">
				<defs />
				<g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
					<path
						className="beat-loader"
						d="M0.5,38.5 L16,38.5 L19,25.5 L24.5,57.5 L31.5,7.5 L37.5,46.5 L43,38.5 L53.5,38.5"
						id="Path-2"
						strokeWidth={2}
					/>
				</g>
			</svg>
		</div>
	</div>
);
const ProtectedRoute = ({ authStatus }) => {
	return authStatus === true ? <Outlet /> : authStatus === false ? <Navigate to="/" /> : null;
};

const GuestRoute = ({ authStatus }) => {
	return authStatus === true ? <Navigate to="/user" /> : authStatus === false ? <Outlet /> : null;
};

function App() {
	const [authStatus, setAuthStatus] = useState(false);

	return (
		<div className="d-flex flex-column " style={{ minHeight: "100vh" }}>
			<Header />
			<Suspense fallback={LoadingComponent}>
				<Routes>
					<Route path="/" element={<LazyComponents.Home />} />

					{/* Guest routes for users not logged in */}
					<Route path="/" element={<GuestRoute authStatus={authStatus} />}>
						<Route path="/register" element={<LazyComponents.Register />} />
					</Route>

					{/* Protected routes for logged in users */}
					<Route path="/" element={<ProtectedRoute authStatus={authStatus} />}></Route>
					<Route path="*" element={<LazyComponents.ErrorPage />} />
				</Routes>
			</Suspense>
			<Footer />
		</div>
	);
}

export default App;
