import { useEffect, useRef, useState } from "react";
import ChatContentHeader from "./ChatContentHeader";
import ChatContentAside from "./ChatContentAside";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUserChats, selectedUserChat, selectedUserMessages, setMessages } from "../../../store/redux/chat";
import { selectLogInUserInfo } from "../../../store/redux/user";
import Modal from "react-bootstrap/Modal";
// import GroupChatModal from "../../../styles/modal/GroupChatModal";
// import SearchUserModal from "../../../styles/modal/SearchUserModal";
import { useToast } from "../../../store/hooks/useToast";
import ChatMessageBody from "./ChatMessageBody";
import { handleFormDataInput } from "../../../utils/helpers";
import { useSocket } from "../../../store/hooks/useSocket";
import { getGroupMessages, sendMessage } from "../../../actions/chat";
const ChatContent = () => {
	const dispatch = useDispatch();
	const { notify } = useToast();
	const socket = useSocket();
	const userSelectedChat = useSelector(selectedUserChat);
	const loggedUser = useSelector(selectLogInUserInfo || {});
	const userChats = useSelector(selectLoggedInUserChats);
	const [showAside, setShowAside] = useState(false);
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({});

	const userAllMessages = useSelector(selectedUserMessages || []);

	const chatContainerRef = useRef(null);

	const fetchGroupMessages = () => {
		dispatch(getGroupMessages({ formData: { chatId: userSelectedChat?._id }, notify })).then(() => {});
	};

	useEffect(() => {
		if (socket === null || !userAllMessages.length) return;

		const latestMessage = userAllMessages[userAllMessages.length - 1];

		const receiver = userSelectedChat?.members.find((user) => user._id !== loggedUser._id);
		if (latestMessage?.sender._id === loggedUser._id) {
			socket.emit("sendMessage", { ...latestMessage, receiver });
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [socket, userAllMessages]);

	useEffect(() => {
		if (socket === null) return;
		socket.on("getMessage", (message) => {
			if (userSelectedChat?._id !== message.chat?._id) return;
			dispatch(setMessages(message));
		});

		return () => {
			socket.off("getMessage");
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [socket, userSelectedChat]);

	useEffect(() => {
		if (!userSelectedChat?._id) return;
		fetchGroupMessages();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userSelectedChat]);

	const handleSendMessage = (e) => {
		e.preventDefault();

		// if (formData?.chatMedia) {
		// 	socket.emit("send-message", {
		// 		groupID: currentActiveGroup?._id,
		// 		media: { ...formData.chatMedia, filename: formData?.chatMedia?.file?.name },
		// 		type: "media",
		// 		sender: loggedUser._id,
		// 	});
		// } else {
		// 	if (isEditingMessage) {
		// 		socket.emit("edit-message", formData);
		// 	} else {
		// 		socket.emit("send-message", {
		// 			groupID: currentActiveGroup?._id,
		// 			message: formData?.message,
		// 			type: "text",
		// 			sender: user._id,
		// 		});
		// 	}
		// }
		// socket.emit("send-message", {
		// 	message: formData?.message,
		// 	type: "text",
		// 	sender: loggedUser?._id,
		// 	chatId: userSelectedChat?._id,
		// });

		dispatch(sendMessage({ formData: { message: formData?.message, chatId: userSelectedChat._id }, notify }));

		// setIsEditingMessage(false);
		setFormData({});
	};

	useEffect(() => {
		scrollToLatestMessage();
	}, [userAllMessages]);

	const scrollToLatestMessage = () => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
		}
	};

	return (
		<>
			<div className={`tyn-main tyn-chat-content ${showAside && "aside-shown"} ${userSelectedChat && "main-shown"} `}>
				{userSelectedChat && <ChatContentHeader showAside={showAside} setShowAside={setShowAside} />}

				<div ref={chatContainerRef} className="tyn-chat-body js-scroll-to-end" id="tynChatBody">
					{userSelectedChat ? (
						<ChatMessageBody loading={loading} />
					) : (
						<div className="w-100 h-100 d-flex justify-content-center align-items-center flex-column ">
							<h1>WELCOME! {loggedUser && loggedUser?.name?.toUpperCase()}</h1>
							{userChats?.length > 0 ? (
								<h6 className="fw-light">Click on a users to start Chatting</h6>
							) : (
								<h6 className="fw-light">
									Find{" "}
									<a className="cursor-pointer" onClick={() => setShow(true)}>
										Friends
									</a>
								</h6>
							)}
						</div>
					)}
				</div>
				<div className={`tyn-chat-form ${!userSelectedChat && "py-4"} `}>
					{userSelectedChat && (
						<>
							<div className="tyn-chat-form-insert">
								<ul className="tyn-list-inline gap gap-3">
									<li className="dropup">
										<button className="btn btn-icon btn-light btn-md btn-pill">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={16}
												height={16}
												fill="currentColor"
												className="bi bi-plus-lg"
												viewBox="0 0 16 16"
											>
												<path
													fillRule="evenodd"
													d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
												/>
											</svg>
										</button>
										<div className="dropdown-menu">
											<ul className="tyn-list-links">
												<li>
													<a href="#">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width={16}
															height={16}
															fill="currentColor"
															className="bi bi-person-video2"
															viewBox="0 0 16 16"
														>
															<path d="M10 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
															<path d="M2 1a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2ZM1 3a1 1 0 0 1 1-1h2v2H1V3Zm4 10V2h9a1 1 0 0 1 1 1v9c0 .285-.12.543-.31.725C14.15 11.494 12.822 10 10 10c-3.037 0-4.345 1.73-4.798 3H5Zm-4-2h3v2H2a1 1 0 0 1-1-1v-1Zm3-1H1V8h3v2Zm0-3H1V5h3v2Z" />
														</svg>
														<span>New Group</span>
													</a>
												</li>
												<li>
													<a href="#">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width={16}
															height={16}
															fill="currentColor"
															className="bi bi-mic"
															viewBox="0 0 16 16"
														>
															<path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
															<path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z" />
														</svg>
														<span>Voice Clip</span>
													</a>
												</li>
											</ul>
										</div>
									</li>
									<li className="d-none d-sm-block">
										<button className="btn btn-icon btn-light btn-md btn-pill">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={16}
												height={16}
												fill="currentColor"
												className="bi bi-card-image"
												viewBox="0 0 16 16"
											>
												<path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
												<path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
											</svg>
										</button>
									</li>
									<li className="d-none d-sm-block">
										<button className="btn btn-icon btn-light btn-md btn-pill">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={16}
												height={16}
												fill="currentColor"
												className="bi bi-emoji-smile-fill"
												viewBox="0 0 16 16"
											>
												<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zM4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z" />
											</svg>
										</button>
									</li>
								</ul>
							</div>
							<form onSubmit={handleSendMessage} className="tyn-chat-form-enter">
								<input
									className="tyn-chat-form-input border-0"
									type="text"
									name="message"
									value={formData?.message || ""}
									onChange={(e) => handleFormDataInput(e, setFormData)}
									placeholder="Enter a message..."
								/>
								<ul className="tyn-list-inline me-n2 my-1">
									<li>
										<button className="btn btn-icon btn-white btn-md btn-pill">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={16}
												height={16}
												fill="currentColor"
												className="bi bi-mic-fill"
												viewBox="0 0 16 16"
											>
												<path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />
												<path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
											</svg>
										</button>
									</li>
									<li>
										<button type="submit" className="btn btn-icon btn-white btn-md btn-pill" id="tynChatSend">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={16}
												height={16}
												fill="currentColor"
												className="bi bi-send-fill"
												viewBox="0 0 16 16"
											>
												<path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
											</svg>
										</button>
									</li>
								</ul>
							</form>
						</>
					)}
				</div>

				<ChatContentAside showAside={showAside} />
			</div>

			<Modal className="modal fade" centered size="md" show={show} onHide={() => setShow(false)}>
				<Modal.Body>
					{/* {!groupChat ? (
						<SearchUserModal chats={userChats} setShow={setShow} setGroupChat={setGroupChat} />
					) : (
						<GroupChatModal setGroupChat={setGroupChat} setShow={setShow} />
					)} */}
				</Modal.Body>
			</Modal>
		</>
	);
};

export default ChatContent;
