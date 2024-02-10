import { useEffect, useState } from "react";
import { getSearchUsersInfo } from "../../actions/user";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../store/hooks/useToast";
import { clearSearchUsers, selectLogInUserInfo, selectSearchUsersInfo } from "../../store/redux/user";
// import {
// 	createGroupChat,
// 	fetchLoggedInUserChats,
// 	updateGroupChatUsers,
// 	updateGroupChatName,
// 	removeGroupChatUser,
// } from "../../actions/chat";
// import { changeSelectedChat, selectedUserChat } from "../../store/redux/chat";
import LoadingSpinner from "../loading/LoadingSpinner";
import { createChatGroup } from "../../actions/chat";

const GroupChatModal = (props) => {
	const dispatch = useDispatch();
	const { notify } = useToast();
	const [groupChatName, setGroupChatName] = useState("");
	const [editGroupChatName, setEditGroupChatName] = useState("");
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [searchFormData, setSearchFormData] = useState({
		search: "",
	});
	const searchedUsers = useSelector(selectSearchUsersInfo);
	// const userSelectedChat = useSelector(selectedUserChat);
	const loggedUser = useSelector(selectLogInUserInfo || false);

	const handleSearch = (e) => {
		const { name, value } = e.target;
		setSearchFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};
	console.log(selectedUsers);
	const handleAddToGroup = (userToAdd, toUpdated) => {
		if (toUpdated) {
			if (userSelectedChat?.groupAdmin._id !== loggedUser._id) {
				notify("error", "only Admin can add someone!");
				return;
			}
			if (userSelectedChat.users.find((u) => u._id === userToAdd._id)) {
				notify("error", "user already added");
				return;
			}
			dispatch(updateGroupChatUsers({ formData: { chatId: userSelectedChat._id, userId: userToAdd._id }, notify })).then(
				() => {
					dispatch(fetchLoggedInUserChats({ formData: {}, notify }));
				}
			);
		} else {
			if (selectedUsers.includes(userToAdd)) {
				notify("error", "user already added");
				return;
			}

			setSelectedUsers([...selectedUsers, userToAdd]);
		}
	};
	const handleDeleteFromGroup = (delUser, options) => {
		if (options) {
			const { toUpdated, leaveBySelf } = options;

			if (toUpdated) {
				if (userSelectedChat?.groupAdmin._id !== loggedUser._id && delUser._id !== loggedUser._id) {
					notify("error", "only Admin can remove someone!");
					return;
				}
				dispatch(removeGroupChatUser({ formData: { chatId: userSelectedChat._id, userId: delUser._id }, notify })).then(
					() => {
						props.setShow(false);
						dispatch(fetchLoggedInUserChats({ formData: {}, notify }));
						dispatch(clearSearchUsers());
						if (leaveBySelf) {
							dispatch(changeSelectedChat(null));
						}
					}
				);
			}
		}

		setSelectedUsers(selectedUsers.filter((user) => user._id !== delUser._id));
	};
	const handleCreateGroup = () => {
		if (!groupChatName || !selectedUsers) {
			notify("error", "Fill all the fields");
			return;
		}
		const memberIds = selectedUsers.map((member) => member._id);

		dispatch(createChatGroup({ formData: { title: groupChatName, members: memberIds }, notify })).then(() => {
			props.setGroupChat(false);
			props.setShow(false);
			setGroupChatName("");
			setSearchFormData({ search: "" });
			dispatch(clearSearchUsers());
		});
	};

	useEffect(() => {
		const { search } = searchFormData;
		if (search) {
			setLoading(true);
			dispatch(getSearchUsersInfo({ formData: { ...searchFormData }, notify })).then(() => {
				setLoading(false);
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchFormData]);

	const handleUpdateGroupName = () => {
		if (editGroupChatName) {
			dispatch(updateGroupChatName({ formData: { chatId: userSelectedChat?._id, name: editGroupChatName }, notify })).then(
				() => {
					props.setShow(false);
					dispatch(fetchLoggedInUserChats({ formData: {}, notify }));
					setEditGroupChatName("");
					dispatch(clearSearchUsers());
				}
			);
		}
	};

	return (
		<>
			{props.editGroupChat ? (
				<div className="row g-3 gx-4">
					<div className="col-12">
						<div className="d-flex justify-content-between ">
							<h4 className="mb-0">Edit Group</h4>
						</div>
					</div>

					<div className="col-sm-12">
						<div className="form-group">
							<div className="form-control-wrap">
								<input
									type="text"
									className="form-control"
									onChange={(e) => setEditGroupChatName(e.target.value)}
									placeholder="Edit Name"
								/>
							</div>
						</div>
					</div>
					<div className="col-sm-12">
						<div className="form-group">
							<div className="form-control-wrap">
								<input
									type="text"
									className="form-control"
									name="search"
									onChange={(e) => handleSearch(e)}
									placeholder="Add users"
								/>
							</div>
						</div>
					</div>
					<div className="col-sm-12">
						<div className="">
							<p>Group Members</p>

							{userSelectedChat?.users &&
								userSelectedChat?.users.map((u, index) => (
									<div
										className="d-inline-block"
										onClick={() => handleDeleteFromGroup(u, { toUpdated: true })}
										key={index}
										style={{ cursor: "pointer" }}
									>
										<div className="d-flex justify-content-between  ms-2 bg-success text-white rounded-4 px-2 py-0">
											<p className="me-1 pb-0 mb-0">{u.name}</p>
											<i className="mt-1 fa fa-times"></i>
										</div>
									</div>
								))}
						</div>
					</div>

					{loading ? (
						<LoadingSpinner />
					) : (
						<ul className="tyn-media-list gap gap-3">
							{searchedUsers?.slice(0, 4).map((user) => (
								<li key={user._id} className="cursor-pointer" onClick={() => handleAddToGroup(user, { toUpdated: true })}>
									<div className="tyn-media-group">
										<div className="tyn-media">
											<img src={user.profileImage} alt="" />
										</div>
										<div className="tyn-media-col">
											<div className="tyn-media-row">
												<h6 className="name">{user.name}</h6>
											</div>
											<div className="tyn-media-row">
												<p className="content">{user.email}</p>
											</div>
										</div>
									</div>
								</li>
							))}
						</ul>
					)}
					<div className="col-12 d-flex justify-content-between">
						<a className="cursor-pointer" onClick={() => handleUpdateGroupName()}>
							Update Group
						</a>
						<a
							className="cursor-pointer text-danger"
							onClick={() => handleDeleteFromGroup(loggedUser, { toUpdated: true, leaveBySelf: true })}
						>
							Leave Group
						</a>
					</div>
				</div>
			) : (
				<div className="row g-3 gx-4">
					<div className="col-12">
						<div className="d-flex justify-content-between ">
							<h4 className="mb-0">Create Group</h4>
							<button className="link" onClick={() => props.setGroupChat(false)}>
								<i className="fa fa-chevron-left"></i>
								<span>Personal Chat</span>
							</button>
						</div>
					</div>
					<div className="col-sm-12">
						<div className="form-group">
							<div className="form-control-wrap">
								<input
									type="text"
									className="form-control"
									name=""
									onChange={(e) => setGroupChatName(e.target.value)}
									placeholder="Group Name"
								/>
							</div>
						</div>
					</div>
					<div className="col-sm-12">
						<div className="form-group">
							<div className="form-control-wrap">
								<input
									type="text"
									className="form-control"
									name="search"
									onChange={(e) => handleSearch(e)}
									placeholder="Add users"
								/>
							</div>
						</div>
					</div>
					{searchedUsers.length > 0 && (
						<div className="col-sm-12">
							<div className="">
								{selectedUsers?.map((u, index) => (
									<div
										className="d-inline-block"
										onClick={() => handleDeleteFromGroup(u)}
										key={index}
										style={{ cursor: "pointer" }}
									>
										<div className="d-flex justify-content-between  ms-2 bg-success text-white rounded-4 px-2 py-0">
											<p className="me-1 pb-0 mb-0">{u.name}</p>
											<i className="mt-1 fa fa-times"></i>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{loading ? (
						<div>Loading...</div>
					) : (
						searchedUsers.length > 0 && (
							<ul className="tyn-media-list gap gap-3">
								{searchedUsers?.slice(0, 4).map((user) => (
									<li key={user._id} onClick={() => handleAddToGroup(user)}>
										<div className="tyn-media-group">
											<div className="tyn-media">
												<img src={user?.profileImage} alt="" />
											</div>
											<div className="tyn-media-col">
												<div className="tyn-media-row">
													<h6 className="name">{user?.name}</h6>
												</div>
												<div className="tyn-media-row">
													<p className="content">{user?.email}</p>
												</div>
											</div>
										</div>
									</li>
								))}
							</ul>
						)
					)}

					<div className="col-12">
						<a onClick={() => handleCreateGroup()}>Create Group</a>
					</div>
				</div>
			)}
		</>
	);
};

export default GroupChatModal;
