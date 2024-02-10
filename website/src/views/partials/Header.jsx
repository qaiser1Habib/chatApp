import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions/auth";
import { useToast } from "../../store/hooks/useToast";
import { selectLogInUserInfo } from "../../store/redux/user";
import { userNotifications } from "../../store/redux/notification";
import Notifications from "../component/hearder/Notifications";

const Header = () => {
	const [theme, setTheme] = useState(localStorage.getItem("connectme-html") || "light");
	const [currentComponent, setCurrentComponent] = useState("unread");

	const dispatch = useDispatch();
	const { notify } = useToast();
	const loggedUser = useSelector(selectLogInUserInfo || false);
	const notifications = useSelector(userNotifications || []);
	const unReadNotifications = notifications?.filter((n) => n.isRead === false);
	useEffect(() => {
		localStorage.setItem("connectme-html", theme);
		document.documentElement.setAttribute("data-bs-theme", theme);
	}, [theme]);

	const handleThemeChange = (selectedTheme) => {
		setTheme(selectedTheme);
	};

	const handleLogout = () => {
		dispatch(logoutUser(notify)).then(() => window.location.reload());
	};

	const renderCurrentComponent = () => {
		switch (currentComponent) {
			case "read":
				return <Notifications notifications={notifications} />;
			case "unread":
				return <Notifications notifications={unReadNotifications} />;

			default:
				return null;
		}
	};

	return (
		<nav className="tyn-appbar">
			<div className="tyn-appbar-wrap">
				<div className="tyn-appbar-logo">
					<a className="tyn-logo" href="index.html">
						<svg viewBox="0 0 43 40" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M37.2654 14.793C37.2654 14.793 45.0771 20.3653 41.9525 29.5311C41.9525 29.5311 41.3796 31.1976 39.0361 34.4264L42.4732 37.9677C42.4732 37.9677 43.3065 39.478 41.5879 39.9987H24.9229C24.9229 39.9987 19.611 40.155 14.8198 36.9782C14.8198 36.9782 12.1638 35.2076 9.76825 31.9787L18.6215 32.0308C18.6215 32.0308 24.298 31.9787 29.7662 28.3333C35.2344 24.6878 37.4217 18.6988 37.2654 14.793Z"
								fill="#60A5FA"
							/>
							<path
								d="M34.5053 12.814C32.2659 1.04441 19.3506 0.0549276 19.3506 0.0549276C8.31004 -0.674164 3.31055 6.09597 3.31055 6.09597C-4.24076 15.2617 3.6751 23.6983 3.6751 23.6983C3.6751 23.6983 2.99808 24.6357 0.862884 26.5105C-1.27231 28.3854 1.22743 29.3748 1.22743 29.3748H17.3404C23.4543 28.7499 25.9124 27.3959 25.9124 27.3959C36.328 22.0318 34.5053 12.814 34.5053 12.814ZM19.9963 18.7301H9.16412C8.41419 18.7301 7.81009 18.126 7.81009 17.3761C7.81009 16.6261 8.41419 16.022 9.16412 16.022H19.9963C20.7463 16.022 21.3504 16.6261 21.3504 17.3761C21.3504 18.126 20.7358 18.7301 19.9963 18.7301ZM25.3708 13.314H9.12245C8.37253 13.314 7.76843 12.7099 7.76843 11.96C7.76843 11.21 8.37253 10.6059 9.12245 10.6059H25.3708C26.1207 10.6059 26.7248 11.21 26.7248 11.96C26.7248 12.7099 26.1103 13.314 25.3708 13.314Z"
								fill="#2563EB"
							/>
						</svg>
					</a>
				</div>

				<div className="tyn-appbar-content">
					<ul className="tyn-appbar-nav tyn-appbar-nav-start">
						<li className="tyn-appbar-item">
							<Link className="tyn-appbar-link" to="/">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width={16}
									height={16}
									fill="currentColor"
									className="bi bi-chat-text-fill"
									viewBox="0 0 16 16"
								>
									<path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM4.5 5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z" />
								</svg>
								<span className="d-none">Chats</span>
							</Link>
						</li>

						<li className="tyn-appbar-item">
							<a className="tyn-appbar-link" href="contacts.html">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width={16}
									height={16}
									fill="currentColor"
									className="bi bi-person-lines-fill"
									viewBox="0 0 16 16"
								>
									<path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
								</svg>
								<span className="d-none">Contacts</span>
							</a>
						</li>

						<li className="tyn-appbar-item d-none d-sm-inline-flex">
							<a className="tyn-appbar-link" href="chat-bot.html">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width={16}
									height={16}
									fill="currentColor"
									className="bi bi-robot"
									viewBox="0 0 16 16"
								>
									<path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z" />
									<path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z" />
								</svg>
								<span className="d-none">ChatBot</span>
							</a>
						</li>

						<li className="tyn-appbar-item d-none d-sm-inline-flex">
							<a className="tyn-appbar-link position-relative" href="chat-bot-s2.html">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width={16}
									height={16}
									fill="currentColor"
									className="bi bi-person-bounding-box"
									viewBox="0 0 16 16"
								>
									<path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z" />
									<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
								</svg>
								<div className="badge bg-primary position-absolute rounded-pill top-0 end-0 mt-n1 me-n1">2</div>
								<span className="d-none">ChatBot 2</span>
							</a>
						</li>

						<li className="tyn-appbar-item d-none d-sm-inline-flex">
							<a className="tyn-appbar-link" href="stories.html">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width={16}
									height={16}
									fill="currentColor"
									className="bi bi-subtract"
									viewBox="0 0 16 16"
								>
									<path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z" />
								</svg>
								<span className="d-none">Stories</span>
							</a>
						</li>
					</ul>

					<ul className="tyn-appbar-nav tyn-appbar-nav-end">
						<li className="tyn-appbar-item dropdown">
							<a className="tyn-appbar-link dropdown-toggle" data-bs-toggle="dropdown" href="#" data-bs-offset="0,10">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width={16}
									height={16}
									fill="currentColor"
									className="bi bi-grid-fill"
									viewBox="0 0 16 16"
								>
									<path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z" />
								</svg>
								<span className="d-none">Menu</span>
							</a>
							<div className="dropdown-menu dropdown-menu-auto dropdown-menu-end">
								<ul className="tyn-list-links">
									<li>
										<h6 className="tyn-list-links-heading">Quick Links</h6>
									</li>

									<li>
										<a href="index.html">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={16}
												height={16}
												fill="currentColor"
												className="bi bi-chat-text-fill"
												viewBox="0 0 16 16"
											>
												<path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM4.5 5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z" />
											</svg>
											<span>Chats</span>
										</a>
									</li>

									<li>
										<a href="contacts.html">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={16}
												height={16}
												fill="currentColor"
												className="bi bi-person-lines-fill"
												viewBox="0 0 16 16"
											>
												<path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
											</svg>
											<span>Contacts</span>
										</a>
									</li>

									<li>
										<a href="stories.html">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={16}
												height={16}
												fill="currentColor"
												className="bi bi-subtract"
												viewBox="0 0 16 16"
											>
												<path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z" />
											</svg>
											<span>Stories</span>
										</a>
									</li>

									<li>
										<a href="chat-bot.html">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={16}
												height={16}
												fill="currentColor"
												className="bi bi-robot"
												viewBox="0 0 16 16"
											>
												<path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z" />
												<path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z" />
											</svg>
											<span>ChatBot</span>
										</a>
									</li>

									<li>
										<a href="chat-bot-s2.html">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={16}
												height={16}
												fill="currentColor"
												className="bi bi-person-bounding-box"
												viewBox="0 0 16 16"
											>
												<path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z" />
												<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
											</svg>
											<span>ChatBot S2</span>
										</a>
									</li>

									<li>
										<a href="chat-bot-welcome.html">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={16}
												height={16}
												fill="currentColor"
												className="bi bi-door-open-fill"
												viewBox="0 0 16 16"
											>
												<path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
											</svg>
											<span>ChatBot Welcome</span>
										</a>
									</li>

									<li>
										<a href="pricing.html">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={16}
												height={16}
												fill="currentColor"
												className="bi bi-person-fill-up"
												viewBox="0 0 16 16"
											>
												<path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.354-5.854 1.5 1.5a.5.5 0 0 1-.708.708L13 11.707V14.5a.5.5 0 0 1-1 0v-2.793l-.646.647a.5.5 0 0 1-.708-.708l1.5-1.5a.5.5 0 0 1 .708 0ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
												<path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
											</svg>
											<span>Pricing</span>
										</a>
									</li>

									<li>
										<a href="faq.html">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={16}
												height={16}
												fill="currentColor"
												className="bi bi-question-octagon-fill"
												viewBox="0 0 16 16"
											>
												<path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zM5.496 6.033a.237.237 0 0 1-.24-.247C5.35 4.091 6.737 3.5 8.005 3.5c1.396 0 2.672.73 2.672 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.105a.25.25 0 0 1-.25.25h-.81a.25.25 0 0 1-.25-.246l-.004-.217c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.803 0-1.253.478-1.342 1.134-.018.137-.128.25-.266.25h-.825zm2.325 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z" />
											</svg>
											<span>Faq</span>
										</a>
									</li>

									<li>
										<h6 className="tyn-list-links-heading">UI Components</h6>
									</li>

									<li>
										<a href="ui-chat-replies.html">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={16}
												height={16}
												fill="currentColor"
												className="bi bi-chat-right-text-fill"
												viewBox="0 0 16 16"
											>
												<path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353V2zM3.5 3h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1zm0 2.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1zm0 2.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1z" />
											</svg>
											<span>Chat Replaies</span>
										</a>
									</li>

									<li>
										<a href="ui-usecase-modals.html">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={16}
												height={16}
												fill="currentColor"
												className="bi bi-front"
												viewBox="0 0 16 16"
											>
												<path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm5 10v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2v5a2 2 0 0 1-2 2H5z" />
											</svg>
											<span>UseCase Modals</span>
										</a>
									</li>

									<li>
										<a href="ui-elements.html">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={16}
												height={16}
												fill="currentColor"
												className="bi bi-safe-fill"
												viewBox="0 0 16 16"
											>
												<path d="M9.778 9.414A2 2 0 1 1 6.95 6.586a2 2 0 0 1 2.828 2.828z" />
												<path d="M2.5 0A1.5 1.5 0 0 0 1 1.5V3H.5a.5.5 0 0 0 0 1H1v3.5H.5a.5.5 0 0 0 0 1H1V12H.5a.5.5 0 0 0 0 1H1v1.5A1.5 1.5 0 0 0 2.5 16h12a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 14.5 0h-12zm3.036 4.464 1.09 1.09a3.003 3.003 0 0 1 3.476 0l1.09-1.09a.5.5 0 1 1 .707.708l-1.09 1.09c.74 1.037.74 2.44 0 3.476l1.09 1.09a.5.5 0 1 1-.707.708l-1.09-1.09a3.002 3.002 0 0 1-3.476 0l-1.09 1.09a.5.5 0 1 1-.708-.708l1.09-1.09a3.003 3.003 0 0 1 0-3.476l-1.09-1.09a.5.5 0 1 1 .708-.708zM14 6.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 1 0z" />
											</svg>
											<span>Misc Elements</span>
										</a>
									</li>
								</ul>
							</div>
						</li>

						<li className={`tyn-appbar-item ${unReadNotifications.length  ? "active" : ""}`}>
							<a
								className="tyn-appbar-link dropdown-toggle position-relative"
								data-bs-toggle="dropdown"
								href="#"
								data-bs-offset="0,10"
								data-bs-auto-close="outside"
								aria-expanded="false"
							>
								{unReadNotifications.length > 0 ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-bell-fill"
										viewBox="0 0 16 16"
									>
										<path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
									</svg>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-bell"
										viewBox="0 0 16 16"
									>
										<path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
									</svg>
								)}

								{unReadNotifications.length > 0 && (
									<span className="position-absolute top-2 start-100 translate-middle badge rounded-pill bg-danger">
										{unReadNotifications.length}
										<span className="visually-hidden">unread messages</span>
									</span>
								)}
							</a>
							<div className="dropdown-menu dropdown-menu-rg dropdown-menu-end">
								<div className="dropdown-head">
									<div className="title">
										<h6>Notifications</h6>
									</div>
									<ul className="nav nav-tabs nav-tabs-line" role="tablist">
										<li className="nav-item" role="presentation">
											<button
												onClick={() => setCurrentComponent("unread")}
												className={`nav-link ${currentComponent === "unread" && "active"}`}
											>
												Unread
											</button>
										</li>
										<li className="nav-item" role="presentation">
											<button
												onClick={() => setCurrentComponent("read")}
												className={`nav-link ${currentComponent === "read" && "active"}`}
											>
												All
											</button>
										</li>
									</ul>
								</div>
								{renderCurrentComponent()}
							</div>
						</li>

						<li className="tyn-appbar-item">
							<a
								className="d-inline-flex dropdown-toggle"
								data-bs-auto-close="outside"
								data-bs-toggle="dropdown"
								href="#"
								data-bs-offset="0,10"
							>
								<div className="tyn-media tyn-size-lg tyn-circle">
									<img src={loggedUser?.profileImage} alt="profile picture" />
								</div>
							</a>
							<div className="dropdown-menu dropdown-menu-end">
								<div className="dropdown-gap">
									<div className="tyn-media-group">
										<div className="tyn-media tyn-size-lg">
											<img src={loggedUser?.profileImage} alt="profile picture" />
										</div>
										<div className="tyn-media-col">
											<div className="tyn-media-row">
												<h6 className="name">{loggedUser?.name}</h6>
												<div className="indicator varified">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width={16}
														height={16}
														fill="currentColor"
														className="bi bi-check-circle-fill"
														viewBox="0 0 16 16"
													>
														<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
													</svg>
												</div>
											</div>
											<div className="tyn-media-row has-dot-sap">
												<p className="content">Liked that disco music</p>
											</div>
										</div>
									</div>
								</div>

								<div className="dropdown-gap">
									<div className="d-flex gap gap-2">
										{/* moon-fill */}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={16}
											height={16}
											fill="currentColor"
											className="bi bi-moon-fill"
											viewBox="0 0 16 16"
										>
											<path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
										</svg>
										<div>
											<h6>Darkmode</h6>
											<ul className="d-flex align-items-center gap gap-3">
												<li className="inline-flex">
													<div className="form-check">
														<input
															className="form-check-input"
															type="radio"
															name="themeMode"
															id="dark"
															value="dark"
															checked={theme === "dark"}
															onChange={() => handleThemeChange("dark")}
														/>
														<label className="form-check-label small" htmlFor="dark">
															On
														</label>
													</div>
												</li>
												<li className="inline-flex">
													<div className="form-check">
														<input
															className="form-check-input"
															type="radio"
															name="themeMode"
															id="light"
															value="light"
															checked={theme === "light"}
															onChange={() => handleThemeChange("light")}
														/>
														<label className="form-check-label small" htmlFor="light">
															Off
														</label>
													</div>
												</li>
											</ul>
										</div>
									</div>
								</div>

								<ul className="tyn-list-links">
									<li>
										<a href="profile.html#profile-index">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={16}
												height={16}
												fill="currentColor"
												className="bi bi-person"
												viewBox="0 0 16 16"
											>
												<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
											</svg>
											<span>Profile</span>
										</a>
									</li>
									<li>
										<a href="profile.html#profile-settings">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={16}
												height={16}
												fill="currentColor"
												className="bi bi-gear"
												viewBox="0 0 16 16"
											>
												<path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
												<path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
											</svg>
											<span>Settings</span>
										</a>
									</li>
									<li>
										<a href="profile.html#profile-change-password">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={16}
												height={16}
												fill="currentColor"
												className="bi bi-unlock"
												viewBox="0 0 16 16"
											>
												<path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z" />
											</svg>
											<span>Change Password</span>
										</a>
									</li>
									<li className="dropdown-divider" />
									<li>
										<a type="button" onClick={handleLogout}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={16}
												height={16}
												fill="currentColor"
												className="bi bi-power"
												viewBox="0 0 16 16"
											>
												<path d="M7.5 1v7h1V1h-1z" />
												<path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
											</svg>
											<span>Log Out</span>
										</a>
									</li>
								</ul>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Header;
