import { useDispatch, useSelector } from "react-redux";
import { selectLogInUserInfo } from "../../../store/redux/user";
import { getTimeDifference } from "../../../utils/helpers";
import { selectLoggedInUserChats, setSelectedChat } from "../../../store/redux/chat";
import { setNotificationAsRead } from "../../../store/redux/notification";

const Notifications = (props) => {
	const dispatch = useDispatch();
	const loggedUser = useSelector(selectLogInUserInfo || false);
	const userChats = useSelector(selectLoggedInUserChats || []);

	const markNotificationsAsRead = (selectedNotification) => {
		const chatMembers = [loggedUser?._id, selectedNotification?.sender?._id];
		const desiredChat = userChats.find((chat) => {
			const isDesiredChat = chat?.members.every((member) => {
				return chatMembers.includes(member?._id);
			});
			return isDesiredChat;
		});
		//mark notification as read
		const setNotificationsAsRead = props.notifications.map((el) => {
			if (selectedNotification?.sender?._id === el?.sender?._id) {
				return { ...selectedNotification, isRead: true };
			} else {
				return el;
			}
		});
		dispatch(setSelectedChat(desiredChat));
		dispatch(setNotificationAsRead(setNotificationsAsRead));
	};
	return (
		<>
			<div className="dropdown-gap">
				<ul className="tyn-media-list gap gap-3">
					{props.notifications.length > 0 ? (
						props.notifications.map((n, index) => (
							<li className="cursor-pointer" key={index} onClick={() => markNotificationsAsRead(n)}>
								<div className="tyn-media-group">
									<div className="tyn-media tyn-circle">
										<img src={n?.sender?.profileImage} alt="" />
									</div>
									<div className="tyn-media-col">
										<div className="tyn-media-row">
											<span className="message">
												<strong className="me-2">{n?.sender?.name.split(" ")[0]}</strong>
												Sent message
											</span>
										</div>
										<div className="tyn-media-row">
											<span className="meta">{getTimeDifference(n?.message.createdAt)}</span>
										</div>
									</div>
								</div>
							</li>
						))
					) : (
						<li>No notifications yet</li>
					)}
				</ul>
			</div>
		</>
	);
};

export default Notifications;
