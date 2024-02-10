import { useSelector } from "react-redux";
import LoadingSpinner from "../../../styles/loading/LoadingSpinner";
import { selectedUserMessages } from "../../../store/redux/chat";
import { selectLogInUserInfo } from "../../../store/redux/user";
import { isLastMessage, isSameSender } from "../../../utils/helpers";

const ChatMessageBody = (props) => {
	const loggedUser = useSelector(selectLogInUserInfo || {});
	const userAllMessages = useSelector(selectedUserMessages || []);

	return props.loading ? (
		<div className="w-100 h-100 d-flex justify-content-center align-items-center">
			<LoadingSpinner />
		</div>
	) : (
		<>
			{userAllMessages?.length > 0 &&
				userAllMessages?.map((message, index) => (
					<div key={index} className="tyn-reply" id="tynReply">
						<div className={`tyn-reply-item ${message.sender._id === loggedUser._id ? "outgoing" : "incoming"}`}>
							{isSameSender(userAllMessages, message, index, loggedUser._id) ||
								(isLastMessage(userAllMessages, index, loggedUser._id) && (
									<div className="tyn-reply-avatar">
										<div className="tyn-media tyn-size-md tyn-circle">
											<img src={message.sender.profileImage} alt="profile Image" title={message.sender.name} />
										</div>
									</div>
								))}
							<div className="tyn-reply-group">
								<div className="tyn-reply-bubble">
									<div className="tyn-reply-text">{message.message}</div>

									<ul className="tyn-reply-tools">
										<li>
											<button className="btn btn-icon btn-sm btn-transparent btn-pill">
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

										<li className="dropup-center">
											<button className="btn btn-icon btn-sm btn-transparent btn-pill" data-bs-toggle="dropdown">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={16}
													height={16}
													fill="currentColor"
													className="bi bi-three-dots"
													viewBox="0 0 16 16"
												>
													<path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
												</svg>
											</button>
											<div className="dropdown-menu dropdown-menu-xxs">
												<ul className="tyn-list-links">
													<li>
														<a href="#">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width={16}
																height={16}
																fill="currentColor"
																className="bi bi-pencil-square"
																viewBox="0 0 16 16"
															>
																<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
																<path
																	fillRule="evenodd"
																	d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
																/>
															</svg>
															<span>Edit</span>
														</a>
													</li>
													<li>
														<a href="#">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width={16}
																height={16}
																fill="currentColor"
																className="bi bi-trash"
																viewBox="0 0 16 16"
															>
																<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
																<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
															</svg>
															<span>Delete</span>
														</a>
													</li>
												</ul>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>

						{/* <div className="tyn-reply-item outgoing">
							<div className="tyn-reply-group">
								<div className="tyn-reply-bubble">
									<div className="tyn-reply-call">
										<a href="#" className="tyn-call">
											<div className="tyn-media-group">
												<div className="tyn-media tyn-size-lg text-bg-light">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width={16}
														height={16}
														fill="currentColor"
														className="bi bi-telephone-forward-fill"
														viewBox="0 0 16 16"
													>
														<path
															fillRule="evenodd"
															d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zm10.761.135a.5.5 0 0 1 .708 0l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 0 1-.708-.708L14.293 4H9.5a.5.5 0 0 1 0-1h4.793l-1.647-1.646a.5.5 0 0 1 0-.708z"
														/>
													</svg>
												</div>
												<div className="tyn-media-col">
													<h6 className="name">Outgoing Audio Call</h6>
													<div className="meta">03:29 PM</div>
												</div>
											</div>
										</a>
									</div>

									<ul className="tyn-reply-tools">
										<li>
											<button className="btn btn-icon btn-sm btn-transparent btn-pill">
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

										<li className="dropup-center">
											<button className="btn btn-icon btn-sm btn-transparent btn-pill" data-bs-toggle="dropdown">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={16}
													height={16}
													fill="currentColor"
													className="bi bi-three-dots"
													viewBox="0 0 16 16"
												>
													<path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
												</svg>
											</button>
											<div className="dropdown-menu dropdown-menu-xxs">
												<ul className="tyn-list-links">
													<li>
														<a href="#">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width={16}
																height={16}
																fill="currentColor"
																className="bi bi-pencil-square"
																viewBox="0 0 16 16"
															>
																<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
																<path
																	fillRule="evenodd"
																	d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
																/>
															</svg>
															<span>Edit</span>
														</a>
													</li>
													<li>
														<a href="#">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width={16}
																height={16}
																fill="currentColor"
																className="bi bi-trash"
																viewBox="0 0 16 16"
															>
																<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
																<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
															</svg>
															<span>Delete</span>
														</a>
													</li>
												</ul>
											</div>
										</li>
									</ul>
								</div>

								<div className="tyn-reply-bubble">
									<div className="tyn-reply-call">
										<a href="#" className="tyn-call">
											<div className="tyn-media-group">
												<div className="tyn-media tyn-size-lg text-bg-light">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width={16}
														height={16}
														fill="currentColor"
														className="bi bi-telephone-x-fill"
														viewBox="0 0 16 16"
													>
														<path
															fillRule="evenodd"
															d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zm9.261 1.135a.5.5 0 0 1 .708 0L13 2.793l1.146-1.147a.5.5 0 0 1 .708.708L13.707 3.5l1.147 1.146a.5.5 0 0 1-.708.708L13 4.207l-1.146 1.147a.5.5 0 0 1-.708-.708L12.293 3.5l-1.147-1.146a.5.5 0 0 1 0-.708z"
														/>
													</svg>
												</div>
												<div className="tyn-media-col">
													<h6 className="name">Missed Audio Call</h6>
													<div className="meta">03:29 PM</div>
												</div>
											</div>
										</a>
									</div>

									<ul className="tyn-reply-tools">
										<li>
											<button className="btn btn-icon btn-sm btn-transparent btn-pill">
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

										<li className="dropup-center">
											<button className="btn btn-icon btn-sm btn-transparent btn-pill" data-bs-toggle="dropdown">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={16}
													height={16}
													fill="currentColor"
													className="bi bi-three-dots"
													viewBox="0 0 16 16"
												>
													<path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
												</svg>
											</button>
											<div className="dropdown-menu dropdown-menu-xxs">
												<ul className="tyn-list-links">
													<li>
														<a href="#">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width={16}
																height={16}
																fill="currentColor"
																className="bi bi-pencil-square"
																viewBox="0 0 16 16"
															>
																<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
																<path
																	fillRule="evenodd"
																	d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
																/>
															</svg>
															<span>Edit</span>
														</a>
													</li>
													<li>
														<a href="#">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width={16}
																height={16}
																fill="currentColor"
																className="bi bi-trash"
																viewBox="0 0 16 16"
															>
																<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
																<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
															</svg>
															<span>Delete</span>
														</a>
													</li>
												</ul>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div className="tyn-reply-separator">Aug 22, 2022, 3:05 PM</div>
						<div className="tyn-reply-item outgoing">
							<div className="tyn-reply-group">
								<div className="tyn-reply-bubble">
									<div className="tyn-reply-text"> Do you know which App or feature it will require to set up. </div>

									<ul className="tyn-reply-tools">
										<li>
											<button className="btn btn-icon btn-sm btn-transparent btn-pill">
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

										<li className="dropup-center">
											<button className="btn btn-icon btn-sm btn-transparent btn-pill" data-bs-toggle="dropdown">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={16}
													height={16}
													fill="currentColor"
													className="bi bi-three-dots"
													viewBox="0 0 16 16"
												>
													<path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
												</svg>
											</button>
											<div className="dropdown-menu dropdown-menu-xxs">
												<ul className="tyn-list-links">
													<li>
														<a href="#">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width={16}
																height={16}
																fill="currentColor"
																className="bi bi-pencil-square"
																viewBox="0 0 16 16"
															>
																<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
																<path
																	fillRule="evenodd"
																	d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
																/>
															</svg>
															<span>Edit</span>
														</a>
													</li>
													<li>
														<a href="#">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width={16}
																height={16}
																fill="currentColor"
																className="bi bi-trash"
																viewBox="0 0 16 16"
															>
																<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
																<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
															</svg>
															<span>Delete</span>
														</a>
													</li>
												</ul>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div className="tyn-reply-item incoming">
							<div className="tyn-reply-avatar">
								<div className="tyn-media tyn-size-md tyn-circle">
									<img src="assets/images/avatar/2.jpg" alt="" />
								</div>
							</div>
							<div className="tyn-reply-group">
								<div className="tyn-reply-bubble">
									<div className="tyn-reply-link">
										<a className="tyn-reply-anchor" href="https://www.envato.com/atomic-power-plant-engine/">
											https://www.envato.com/atomic-power-plant-engine/
										</a>
									</div>
									<ul className="tyn-reply-tools">
										<li>
											<button className="btn btn-icon btn-sm btn-transparent btn-pill">
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

										<li className="dropup-center">
											<button className="btn btn-icon btn-sm btn-transparent btn-pill" data-bs-toggle="dropdown">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={16}
													height={16}
													fill="currentColor"
													className="bi bi-three-dots"
													viewBox="0 0 16 16"
												>
													<path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
												</svg>
											</button>
											<div className="dropdown-menu dropdown-menu-xxs">
												<ul className="tyn-list-links">
													<li>
														<a href="#">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width={16}
																height={16}
																fill="currentColor"
																className="bi bi-pencil-square"
																viewBox="0 0 16 16"
															>
																<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
																<path
																	fillRule="evenodd"
																	d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
																/>
															</svg>
															<span>Edit</span>
														</a>
													</li>
													<li>
														<a href="#">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width={16}
																height={16}
																fill="currentColor"
																className="bi bi-trash"
																viewBox="0 0 16 16"
															>
																<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
																<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
															</svg>
															<span>Delete</span>
														</a>
													</li>
												</ul>
											</div>
										</li>
									</ul>
								</div>

								<div className="tyn-reply-bubble">
									<div className="tyn-reply-text"> I hope these article helps. </div>
									<ul className="tyn-reply-tools">
										<li>
											<button className="btn btn-icon btn-sm btn-transparent btn-pill">
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

										<li className="dropup-center">
											<button className="btn btn-icon btn-sm btn-transparent btn-pill" data-bs-toggle="dropdown">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={16}
													height={16}
													fill="currentColor"
													className="bi bi-three-dots"
													viewBox="0 0 16 16"
												>
													<path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
												</svg>
											</button>
											<div className="dropdown-menu dropdown-menu-xxs">
												<ul className="tyn-list-links">
													<li>
														<a href="#">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width={16}
																height={16}
																fill="currentColor"
																className="bi bi-pencil-square"
																viewBox="0 0 16 16"
															>
																<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
																<path
																	fillRule="evenodd"
																	d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
																/>
															</svg>
															<span>Edit</span>
														</a>
													</li>
													<li>
														<a href="#">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width={16}
																height={16}
																fill="currentColor"
																className="bi bi-trash"
																viewBox="0 0 16 16"
															>
																<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
																<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
															</svg>
															<span>Delete</span>
														</a>
													</li>
												</ul>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div className="tyn-reply-separator">May 10, 2022, 11:14 AM</div>
						<div className="tyn-reply-item outgoing">
							<div className="tyn-reply-group">
								<div className="tyn-reply-bubble">
									<div className="tyn-reply-media">
										<a
											href="https://www.youtube.com/watch?v=ag0qTaAKqT8"
											className="glightbox tyn-video"
											data-gallery="media-video"
										>
											<img src="assets/images/gallery/video/hr-6.jpg" className="tyn-image" alt="" />
											<div className="tyn-video-icon">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={16}
													height={16}
													fill="currentColor"
													className="bi bi-play-fill"
													viewBox="0 0 16 16"
												>
													<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
												</svg>
											</div>
										</a>
									</div>
									<ul className="tyn-reply-tools">
										<li>
											<button className="btn btn-icon btn-sm btn-transparent btn-pill">
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

										<li className="dropup-center">
											<button className="btn btn-icon btn-sm btn-transparent btn-pill" data-bs-toggle="dropdown">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={16}
													height={16}
													fill="currentColor"
													className="bi bi-three-dots"
													viewBox="0 0 16 16"
												>
													<path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
												</svg>
											</button>
											<div className="dropdown-menu dropdown-menu-xxs">
												<ul className="tyn-list-links">
													<li>
														<a href="#">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width={16}
																height={16}
																fill="currentColor"
																className="bi bi-pencil-square"
																viewBox="0 0 16 16"
															>
																<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
																<path
																	fillRule="evenodd"
																	d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
																/>
															</svg>
															<span>Edit</span>
														</a>
													</li>
													<li>
														<a href="#">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width={16}
																height={16}
																fill="currentColor"
																className="bi bi-trash"
																viewBox="0 0 16 16"
															>
																<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
																<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
															</svg>
															<span>Delete</span>
														</a>
													</li>
												</ul>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div className="tyn-reply-item incoming">
							<div className="tyn-reply-avatar">
								<div className="tyn-media tyn-size-md tyn-circle">
									<img src="assets/images/avatar/2.jpg" alt="" />
								</div>
							</div>
							<div className="tyn-reply-group">
								<div className="tyn-reply-bubble">
									<div className="tyn-reply-media">
										<a href="images/gallery/chat/1.jpg" className="glightbox tyn-thumb" data-gallery="media-photo">
											<img src="assets/images/gallery/chat/thumb-1.jpg" className="tyn-image" alt="" />
										</a>
										<a href="images/gallery/chat/2.jpg" className="glightbox tyn-thumb" data-gallery="media-photo">
											<img src="assets/images/gallery/chat/thumb-2.jpg" className="tyn-image" alt="" />
										</a>
										<a href="images/gallery/chat/3.jpg" className="glightbox tyn-thumb" data-gallery="media-photo">
											<img src="assets/images/gallery/chat/thumb-3.jpg" className="tyn-image" alt="" />
										</a>
										<a href="images/gallery/chat/4.jpg" className="glightbox tyn-thumb" data-gallery="media-photo">
											<img src="assets/images/gallery/chat/thumb-4.jpg" className="tyn-image" alt="" />
										</a>
										<a href="images/gallery/chat/5.jpg" className="glightbox tyn-thumb" data-gallery="media-photo">
											<img src="assets/images/gallery/chat/thumb-5.jpg" className="tyn-image" alt="" />
										</a>
									</div>
									<ul className="tyn-reply-tools">
										<li>
											<button className="btn btn-icon btn-sm btn-transparent btn-pill">
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

										<li className="dropup-center">
											<button className="btn btn-icon btn-sm btn-transparent btn-pill" data-bs-toggle="dropdown">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={16}
													height={16}
													fill="currentColor"
													className="bi bi-three-dots"
													viewBox="0 0 16 16"
												>
													<path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
												</svg>
											</button>
											<div className="dropdown-menu dropdown-menu-xxs">
												<ul className="tyn-list-links">
													<li>
														<a href="#">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width={16}
																height={16}
																fill="currentColor"
																className="bi bi-pencil-square"
																viewBox="0 0 16 16"
															>
																<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
																<path
																	fillRule="evenodd"
																	d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
																/>
															</svg>
															<span>Edit</span>
														</a>
													</li>
													<li>
														<a href="#">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width={16}
																height={16}
																fill="currentColor"
																className="bi bi-trash"
																viewBox="0 0 16 16"
															>
																<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
																<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
															</svg>
															<span>Delete</span>
														</a>
													</li>
												</ul>
											</div>
										</li>
									</ul>
								</div>

								<div className="tyn-reply-bubble">
									<div className="tyn-reply-text"> I hope these article helps. </div>
									<ul className="tyn-reply-tools">
										<li>
											<button className="btn btn-icon btn-sm btn-transparent btn-pill">
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

										<li className="dropup-center">
											<button className="btn btn-icon btn-sm btn-transparent btn-pill" data-bs-toggle="dropdown">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={16}
													height={16}
													fill="currentColor"
													className="bi bi-three-dots"
													viewBox="0 0 16 16"
												>
													<path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
												</svg>
											</button>
											<div className="dropdown-menu dropdown-menu-xxs">
												<ul className="tyn-list-links">
													<li>
														<a href="#">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width={16}
																height={16}
																fill="currentColor"
																className="bi bi-pencil-square"
																viewBox="0 0 16 16"
															>
																<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
																<path
																	fillRule="evenodd"
																	d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
																/>
															</svg>
															<span>Edit</span>
														</a>
													</li>
													<li>
														<a href="#">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width={16}
																height={16}
																fill="currentColor"
																className="bi bi-trash"
																viewBox="0 0 16 16"
															>
																<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
																<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
															</svg>
															<span>Delete</span>
														</a>
													</li>
												</ul>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div className="tyn-reply-item outgoing">
							<div className="tyn-reply-group">
								<div className="tyn-reply-bubble">
									<div className="tyn-reply-link has-thumb">
										<div className="tyn-reply-link-thumb">
											<a href="#">
												<h6 className="tyn-reply-link-title">Digital Marketing Guide line for dummies</h6>
												<img src="assets/images/avatar/4.jpg" alt="" />
											</a>
										</div>
										<a className="tyn-reply-anchor" href="https://www.envato.com/atomic-power-plant-engine/">
											https://www.envato.com/atomic-power-plant-engine/
										</a>
									</div>
									<ul className="tyn-reply-tools">
										<li>
											<button className="btn btn-icon btn-sm btn-transparent btn-pill">
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

										<li className="dropup-center">
											<button className="btn btn-icon btn-sm btn-transparent btn-pill" data-bs-toggle="dropdown">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={16}
													height={16}
													fill="currentColor"
													className="bi bi-three-dots"
													viewBox="0 0 16 16"
												>
													<path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
												</svg>
											</button>
											<div className="dropdown-menu dropdown-menu-xxs">
												<ul className="tyn-list-links">
													<li>
														<a href="#">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width={16}
																height={16}
																fill="currentColor"
																className="bi bi-pencil-square"
																viewBox="0 0 16 16"
															>
																<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
																<path
																	fillRule="evenodd"
																	d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
																/>
															</svg>
															<span>Edit</span>
														</a>
													</li>
													<li>
														<a href="#">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width={16}
																height={16}
																fill="currentColor"
																className="bi bi-trash"
																viewBox="0 0 16 16"
															>
																<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
																<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
															</svg>
															<span>Delete</span>
														</a>
													</li>
												</ul>
											</div>
										</li>
									</ul>
								</div>

								<div className="tyn-reply-bubble">
									<div className="tyn-reply-text"> I need help. </div>
									<ul className="tyn-reply-tools">
										<li>
											<button className="btn btn-icon btn-sm btn-transparent btn-pill">
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

										<li className="dropup-center">
											<button className="btn btn-icon btn-sm btn-transparent btn-pill" data-bs-toggle="dropdown">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={16}
													height={16}
													fill="currentColor"
													className="bi bi-three-dots"
													viewBox="0 0 16 16"
												>
													<path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
												</svg>
											</button>
											<div className="dropdown-menu dropdown-menu-xxs">
												<ul className="tyn-list-links">
													<li>
														<a href="#">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width={16}
																height={16}
																fill="currentColor"
																className="bi bi-pencil-square"
																viewBox="0 0 16 16"
															>
																<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
																<path
																	fillRule="evenodd"
																	d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
																/>
															</svg>
															<span>Edit</span>
														</a>
													</li>
													<li>
														<a href="#">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width={16}
																height={16}
																fill="currentColor"
																className="bi bi-trash"
																viewBox="0 0 16 16"
															>
																<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
																<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
															</svg>
															<span>Delete</span>
														</a>
													</li>
												</ul>
											</div>
										</li>
									</ul>
								</div>

								<div className="tyn-reply-bubble">
									<div className="tyn-reply-file">
										<a href="#" className="tyn-file">
											<div className="tyn-media-group">
												<div className="tyn-media tyn-size-lg text-bg-light">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width={16}
														height={16}
														fill="currentColor"
														className="bi bi-filetype-docx"
														viewBox="0 0 16 16"
													>
														<path
															fillRule="evenodd"
															d="M14 4.5V11h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5Zm-6.839 9.688v-.522a1.54 1.54 0 0 0-.117-.641.861.861 0 0 0-.322-.387.862.862 0 0 0-.469-.129.868.868 0 0 0-.471.13.868.868 0 0 0-.32.386 1.54 1.54 0 0 0-.117.641v.522c0 .256.04.47.117.641a.868.868 0 0 0 .32.387.883.883 0 0 0 .471.126.877.877 0 0 0 .469-.126.861.861 0 0 0 .322-.386 1.55 1.55 0 0 0 .117-.642Zm.803-.516v.513c0 .375-.068.7-.205.973a1.47 1.47 0 0 1-.589.627c-.254.144-.56.216-.917.216a1.86 1.86 0 0 1-.92-.216 1.463 1.463 0 0 1-.589-.627 2.151 2.151 0 0 1-.205-.973v-.513c0-.379.069-.704.205-.975.137-.274.333-.483.59-.627.257-.147.564-.22.92-.22.357 0 .662.073.916.22.256.146.452.356.59.63.136.271.204.595.204.972ZM1 15.925v-3.999h1.459c.406 0 .741.078 1.005.235.264.156.46.382.589.68.13.296.196.655.196 1.074 0 .422-.065.784-.196 1.084-.131.301-.33.53-.595.689-.264.158-.597.237-.999.237H1Zm1.354-3.354H1.79v2.707h.563c.185 0 .346-.028.483-.082a.8.8 0 0 0 .334-.252c.088-.114.153-.254.196-.422a2.3 2.3 0 0 0 .068-.592c0-.3-.04-.552-.118-.753a.89.89 0 0 0-.354-.454c-.158-.102-.361-.152-.61-.152Zm6.756 1.116c0-.248.034-.46.103-.633a.868.868 0 0 1 .301-.398.814.814 0 0 1 .475-.138c.15 0 .283.032.398.097a.7.7 0 0 1 .273.26.85.85 0 0 1 .12.381h.765v-.073a1.33 1.33 0 0 0-.466-.964 1.44 1.44 0 0 0-.49-.272 1.836 1.836 0 0 0-.606-.097c-.355 0-.66.074-.911.223-.25.148-.44.359-.571.633-.131.273-.197.6-.197.978v.498c0 .379.065.704.194.976.13.271.321.48.571.627.25.144.555.216.914.216.293 0 .555-.054.785-.164.23-.11.414-.26.551-.454a1.27 1.27 0 0 0 .226-.674v-.076h-.765a.8.8 0 0 1-.117.364.699.699 0 0 1-.273.248.874.874 0 0 1-.401.088.845.845 0 0 1-.478-.131.834.834 0 0 1-.298-.393 1.7 1.7 0 0 1-.103-.627v-.495Zm5.092-1.76h.894l-1.275 2.006 1.254 1.992h-.908l-.85-1.415h-.035l-.852 1.415h-.862l1.24-2.015-1.228-1.984h.932l.832 1.439h.035l.823-1.439Z"
														/>
													</svg>
												</div>
												<div className="tyn-media-col">
													<h6 className="name">Konstantin_cv.docx</h6>
													<div className="meta">24.65 MB</div>
												</div>
											</div>
										</a>
									</div>
									<ul className="tyn-reply-tools">
										<li>
											<button className="btn btn-icon btn-sm btn-transparent btn-pill">
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

										<li className="dropup-center">
											<button className="btn btn-icon btn-sm btn-transparent btn-pill" data-bs-toggle="dropdown">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={16}
													height={16}
													fill="currentColor"
													className="bi bi-three-dots"
													viewBox="0 0 16 16"
												>
													<path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
												</svg>
											</button>
											<div className="dropdown-menu dropdown-menu-xxs">
												<ul className="tyn-list-links">
													<li>
														<a href="#">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width={16}
																height={16}
																fill="currentColor"
																className="bi bi-pencil-square"
																viewBox="0 0 16 16"
															>
																<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
																<path
																	fillRule="evenodd"
																	d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
																/>
															</svg>
															<span>Edit</span>
														</a>
													</li>
													<li>
														<a href="#">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width={16}
																height={16}
																fill="currentColor"
																className="bi bi-trash"
																viewBox="0 0 16 16"
															>
																<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
																<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
															</svg>
															<span>Delete</span>
														</a>
													</li>
												</ul>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div> */}
					</div>
				))}
		</>
	);
};

export default ChatMessageBody;
