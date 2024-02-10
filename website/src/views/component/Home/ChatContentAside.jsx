// import { useDispatch, useSelector } from "react-redux";
// import { useToast } from "../../../store/hooks/useToast";
// import { useState } from "react";
// import { selectSearchUsersInfo } from "../../../store/redux/user";
// import { selectedUserChat } from "../../../store/redux/chat";

const ChatContentAside = (props) => {
	// const dispatch = useDispatch();
	// const { notify } = useToast();
	// const [groupChatName, setGroupChatName] = useState();
	// const [selectedUsers, setSelectedUsers] = useState([]);
	// const [loading, setLoading] = useState(false);
	// const [searchFormData, setSearchFormData] = useState({
	// 	search: "",
	// });
	// const searchedUsers = useSelector(selectSearchUsersInfo);
	// const selectedChat = useSelector(selectedUserChat);

	return (
		<div className={`tyn-chat-content-aside  ${props.showAside && "show-aside"}`} id="tynChatAside" data-simplebar="">
			<div className="tyn-chat-cover">
				<img src="assets/images/cover/1.jpg" alt="" />
			</div>
			<div className="tyn-media-group tyn-media-vr tyn-media-center mt-n4">
				<div className="tyn-media tyn-size-xl border border-2 border-white">
					<img src="assets/images/avatar/1.jpg" alt="" />
				</div>
				<div className="tyn-media-col">
					<div className="tyn-media-row">
						<h6 className="name">Konstantin Frank</h6>
					</div>
					<div className="tyn-media-row has-dot-sap">
						<span className="meta">Active Now</span>
					</div>
				</div>
			</div>
			<div className="tyn-aside-row">
				<ul className="nav nav-btns nav-btns-stretch nav-btns-light">
					<li className="nav-item">
						<button className="nav-link js-chat-mute-toggle tyn-chat-mute" type="button">
							<span className="icon unmuted-icon">
								{/* bell-fill */}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width={16}
									height={16}
									fill="currentColor"
									className="bi bi-bell-fill"
									viewBox="0 0 16 16"
								>
									<path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
								</svg>
							</span>
							<span className="unmuted-icon">Mute</span>
							<span className="icon muted-icon">
								{/* bell-slash-fill */}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width={16}
									height={16}
									fill="currentColor"
									className="bi bi-bell-slash-fill"
									viewBox="0 0 16 16"
								>
									<path d="M5.164 14H15c-1.5-1-2-5.902-2-7 0-.264-.02-.523-.06-.776L5.164 14zm6.288-10.617A4.988 4.988 0 0 0 8.995 2.1a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 7c0 .898-.335 4.342-1.278 6.113l9.73-9.73zM10 15a2 2 0 1 1-4 0h4zm-9.375.625a.53.53 0 0 0 .75.75l14.75-14.75a.53.53 0 0 0-.75-.75L.625 15.625z" />
								</svg>
							</span>
							<span className="muted-icon">Muted</span>
						</button>
					</li>
					<li className="nav-item">
						<button className="nav-link" data-bs-toggle="tab" data-bs-target="#chat-media" type="button">
							{/* images */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width={16}
								height={16}
								fill="currentColor"
								className="bi bi-images"
								viewBox="0 0 16 16"
							>
								<path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
								<path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z" />
							</svg>
							<span>Media</span>
						</button>
					</li>
					<li className="nav-item">
						<button className="nav-link active" data-bs-toggle="tab" data-bs-target="#chat-options" type="button">
							{/* sliders */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width={16}
								height={16}
								fill="currentColor"
								className="bi bi-sliders"
								viewBox="0 0 16 16"
							>
								<path
									fillRule="evenodd"
									d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"
								/>
							</svg>
							<span>Options</span>
						</button>
					</li>
				</ul>
			</div>
			<div className="tab-content">
				<div className="tab-pane" id="chat-media" tabIndex={0}>
					<div className="tyn-aside-row py-0">
						<ul className="nav nav-tabs nav-tabs-line">
							<li className="nav-item">
								<button
									className="nav-link active"
									data-bs-toggle="tab"
									data-bs-target="#chat-media-images"
									type="button"
								>
									Images
								</button>
							</li>
							<li className="nav-item">
								<button className="nav-link" data-bs-toggle="tab" data-bs-target="#chat-media-videos" type="button">
									Videos
								</button>
							</li>
							<li className="nav-item">
								<button className="nav-link" data-bs-toggle="tab" data-bs-target="#chat-media-files" type="button">
									Files
								</button>
							</li>
							<li className="nav-item">
								<button className="nav-link" data-bs-toggle="tab" data-bs-target="#chat-media-links" type="button">
									Links
								</button>
							</li>
						</ul>
					</div>
					<div className="tyn-aside-row">
						<div className="tab-content">
							<div className="tab-pane show active" id="chat-media-images" tabIndex={0}>
								<div className="row g-3">
									<div className="col-4">
										<a href="images/gallery/chat/1.jpg" className="glightbox tyn-thumb" data-gallery="media-photo">
											<img src="assets/images/gallery/chat/thumb-1.jpg" className="tyn-image" alt="" />
										</a>
									</div>
									<div className="col-4">
										<a href="images/gallery/chat/2.jpg" className="glightbox tyn-thumb" data-gallery="media-photo">
											<img src="assets/images/gallery/chat/thumb-2.jpg" className="tyn-image" alt="" />
										</a>
									</div>
									<div className="col-4">
										<a href="images/gallery/chat/3.jpg" className="glightbox tyn-thumb" data-gallery="media-photo">
											<img src="assets/images/gallery/chat/thumb-3.jpg" className="tyn-image" alt="" />
										</a>
									</div>
									<div className="col-4">
										<a href="images/gallery/chat/4.jpg" className="glightbox tyn-thumb" data-gallery="media-photo">
											<img src="assets/images/gallery/chat/thumb-4.jpg" className="tyn-image" alt="" />
										</a>
									</div>
									<div className="col-4">
										<a href="images/gallery/chat/5.jpg" className="glightbox tyn-thumb" data-gallery="media-photo">
											<img src="assets/images/gallery/chat/thumb-5.jpg" className="tyn-image" alt="" />
										</a>
									</div>
									<div className="col-4">
										<a href="images/gallery/chat/6.jpg" className="glightbox tyn-thumb" data-gallery="media-photo">
											<img src="assets/images/gallery/chat/thumb-6.jpg" className="tyn-image" alt="" />
										</a>
									</div>
								</div>
							</div>

							<div className="tab-pane" id="chat-media-videos" tabIndex={0}>
								<div className="row g-3">
									<div className="col-6">
										<a
											href="https://www.youtube.com/watch?v=ag0qTaAKqT8"
											className="glightbox tyn-video"
											data-gallery="media-video"
										>
											<img src="assets/images/gallery/video/hr-1.jpg" className="tyn-image" alt="" />
											<div className="tyn-video-icon">
												{/* play-fill */}
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
									<div className="col-6">
										<a
											href="https://www.youtube.com/watch?v=ag0qTaAKqT8"
											className="glightbox tyn-video"
											data-gallery="media-video"
										>
											<img src="assets/images/gallery/video/hr-2.jpg" className="tyn-image" alt="" />
											<div className="tyn-video-icon">
												{/* play-fill */}
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
									<div className="col-6">
										<a
											href="https://www.youtube.com/watch?v=ag0qTaAKqT8"
											className="glightbox tyn-video"
											data-gallery="media-video"
										>
											<img src="assets/images/gallery/video/hr-3.jpg" className="tyn-image" alt="" />
											<div className="tyn-video-icon">
												{/* play-fill */}
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
									<div className="col-6">
										<a
											href="https://www.youtube.com/watch?v=ag0qTaAKqT8"
											className="glightbox tyn-video"
											data-gallery="media-video"
										>
											<img src="assets/images/gallery/video/hr-4.jpg" className="tyn-image" alt="" />
											<div className="tyn-video-icon">
												{/* play-fill */}
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
									<div className="col-6">
										<a
											href="https://www.youtube.com/watch?v=ag0qTaAKqT8"
											className="glightbox tyn-video"
											data-gallery="media-video"
										>
											<img src="assets/images/gallery/video/vr-5.jpg" className="tyn-image" alt="" />
											<div className="tyn-video-icon">
												{/* play-fill */}
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
									<div className="col-6">
										<a
											href="https://www.youtube.com/watch?v=ag0qTaAKqT8"
											className="glightbox tyn-video"
											data-gallery="media-video"
										>
											<img src="assets/images/gallery/video/hr-6.jpg" className="tyn-image" alt="" />
											<div className="tyn-video-icon">
												{/* play-fill */}
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
								</div>
							</div>

							<div className="tab-pane" id="chat-media-files" tabIndex={0}>
								<ul className="tyn-media-list gap gap-3">
									<li>
										<a href="#" className="tyn-file">
											<div className="tyn-media-group">
												<div className="tyn-media tyn-size-lg text-bg-light">
													{/* filetype-docx */}
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
									</li>
									<li>
										<a href="#" className="tyn-file">
											<div className="tyn-media-group">
												<div className="tyn-media tyn-size-lg text-bg-light">
													{/* filetype-ai */}
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width={16}
														height={16}
														fill="currentColor"
														className="bi bi-filetype-ai"
														viewBox="0 0 16 16"
													>
														<path
															fillRule="evenodd"
															d="M14 4.5V14a2 2 0 0 1-2 2H6v-1h6a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.113 14.82.8 15.85H0l1.342-3.999h.926l1.336 3.999h-.841l-.314-1.028H1.113Zm1.178-.588-.49-1.617h-.034l-.49 1.617h1.014Zm2.425-2.382v3.999h-.791V11.85h.79Z"
														/>
													</svg>
												</div>
												<div className="tyn-media-col">
													<h6 className="name">themeyn_logo.ai</h6>
													<div className="meta">2.08 MB</div>
												</div>
											</div>
										</a>
									</li>
									<li>
										<a href="#" className="tyn-file">
											<div className="tyn-media-group">
												<div className="tyn-media tyn-size-lg text-bg-light">
													{/* filetype-pdf */}
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width={16}
														height={16}
														fill="currentColor"
														className="bi bi-filetype-pdf"
														viewBox="0 0 16 16"
													>
														<path
															fillRule="evenodd"
															d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z"
														/>
													</svg>
												</div>
												<div className="tyn-media-col">
													<h6 className="name">realReact.pdf</h6>
													<div className="meta">19.54 MB</div>
												</div>
											</div>
										</a>
									</li>
									<li>
										<a href="#" className="tyn-file">
											<div className="tyn-media-group">
												<div className="tyn-media tyn-size-lg text-bg-light">
													{/* filetype-csv */}
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width={16}
														height={16}
														fill="currentColor"
														className="bi bi-filetype-csv"
														viewBox="0 0 16 16"
													>
														<path
															fillRule="evenodd"
															d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM3.517 14.841a1.13 1.13 0 0 0 .401.823c.13.108.289.192.478.252.19.061.411.091.665.091.338 0 .624-.053.859-.158.236-.105.416-.252.539-.44.125-.189.187-.408.187-.656 0-.224-.045-.41-.134-.56a1.001 1.001 0 0 0-.375-.357 2.027 2.027 0 0 0-.566-.21l-.621-.144a.97.97 0 0 1-.404-.176.37.37 0 0 1-.144-.299c0-.156.062-.284.185-.384.125-.101.296-.152.512-.152.143 0 .266.023.37.068a.624.624 0 0 1 .246.181.56.56 0 0 1 .12.258h.75a1.092 1.092 0 0 0-.2-.566 1.21 1.21 0 0 0-.5-.41 1.813 1.813 0 0 0-.78-.152c-.293 0-.551.05-.776.15-.225.099-.4.24-.527.421-.127.182-.19.395-.19.639 0 .201.04.376.122.524.082.149.2.27.352.367.152.095.332.167.539.213l.618.144c.207.049.361.113.463.193a.387.387 0 0 1 .152.326.505.505 0 0 1-.085.29.559.559 0 0 1-.255.193c-.111.047-.249.07-.413.07-.117 0-.223-.013-.32-.04a.838.838 0 0 1-.248-.115.578.578 0 0 1-.255-.384h-.765ZM.806 13.693c0-.248.034-.46.102-.633a.868.868 0 0 1 .302-.399.814.814 0 0 1 .475-.137c.15 0 .283.032.398.097a.7.7 0 0 1 .272.26.85.85 0 0 1 .12.381h.765v-.072a1.33 1.33 0 0 0-.466-.964 1.441 1.441 0 0 0-.489-.272 1.838 1.838 0 0 0-.606-.097c-.356 0-.66.074-.911.223-.25.148-.44.359-.572.632-.13.274-.196.6-.196.979v.498c0 .379.064.704.193.976.131.271.322.48.572.626.25.145.554.217.914.217.293 0 .554-.055.785-.164.23-.11.414-.26.55-.454a1.27 1.27 0 0 0 .226-.674v-.076h-.764a.799.799 0 0 1-.118.363.7.7 0 0 1-.272.25.874.874 0 0 1-.401.087.845.845 0 0 1-.478-.132.833.833 0 0 1-.299-.392 1.699 1.699 0 0 1-.102-.627v-.495Zm8.239 2.238h-.953l-1.338-3.999h.917l.896 3.138h.038l.888-3.138h.879l-1.327 4Z"
														/>
													</svg>
												</div>
												<div className="tyn-media-col">
													<h6 className="name">my_contacts.csv</h6>
													<div className="meta">0.97 MB</div>
												</div>
											</div>
										</a>
									</li>
									<li>
										<a href="#" className="tyn-file">
											<div className="tyn-media-group">
												<div className="tyn-media tyn-size-lg text-bg-light">
													{/* filetype-mdx */}
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width={16}
														height={16}
														fill="currentColor"
														className="bi bi-filetype-mdx"
														viewBox="0 0 16 16"
													>
														<path
															fillRule="evenodd"
															d="M14 4.5V14a2 2 0 0 1-2 2v-1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM.706 15.849v-2.66h.038l.952 2.159h.516l.946-2.16h.038v2.661h.715V11.85h-.8l-1.14 2.596h-.026L.805 11.85H0v3.999h.706Zm3.559-3.999v3.999h1.459c.402 0 .735-.08.999-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.066-.778-.196-1.075a1.426 1.426 0 0 0-.59-.68c-.263-.156-.598-.234-1.004-.234h-1.46Zm.79.645h.563c.248 0 .451.05.61.152a.89.89 0 0 1 .354.454c.078.201.117.452.117.753 0 .227-.022.424-.067.592a1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.484.082h-.562v-2.707Zm4.787-.645h.894L9.46 13.857l1.254 1.992h-.908l-.85-1.415h-.035l-.852 1.415h-.862l1.24-2.016L7.22 11.85h.932l.832 1.439h.035l.823-1.439Z"
														/>
													</svg>
												</div>
												<div className="tyn-media-col">
													<h6 className="name">blog_posts.mdx</h6>
													<div className="meta">6.19 MB</div>
												</div>
											</div>
										</a>
									</li>
								</ul>
							</div>

							<div className="tab-pane" id="chat-media-links" tabIndex={0}>
								<ul className="tyn-media-list gap gap-3">
									<li>
										<a href="#" className="tyn-links">
											<div className="tyn-media-group">
												<div className="tyn-media tyn-size-xl">
													<img src="assets/images/gallery/chat/thumb-7.jpg" alt="" />
												</div>
												<div className="tyn-media-col">
													<h6 className="name">Digital Marketing Guide</h6>
													<div className="anchor">https://www.envato.com/blog/digital-marketing-guide/</div>
												</div>
											</div>
										</a>
									</li>
									<li>
										<a href="#" className="tyn-links">
											<div className="tyn-media-group">
												<div className="tyn-media tyn-size-xl">
													<img src="assets/images/gallery/chat/thumb-8.jpg" alt="" />
												</div>
												<div className="tyn-media-col">
													<h6 className="name">Atomic power plant engine</h6>
													<div className="anchor">https://www.envato.com/atomic-power-plant-engine/</div>
												</div>
											</div>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<div className="tab-pane show active" id="chat-options" tabIndex={0}>
					<div className="tyn-aside-row py-0">
						<ul className="nav nav-tabs nav-tabs-line">
							<li className="nav-item">
								<button
									className="nav-link active"
									data-bs-toggle="tab"
									data-bs-target="#chat-options-customize"
									type="button"
								>
									Customize
								</button>
							</li>
							<li className="nav-item">
								<button className="nav-link" data-bs-toggle="tab" data-bs-target="#chat-options-manage" type="button">
									Manage
								</button>
							</li>
						</ul>
					</div>
					<div className="tyn-aside-row">
						<div className="tab-content">
							<div className="tab-pane show active" id="chat-options-customize" tabIndex={0}>
								<ul className="d-flex flex-column gap gap-4">
									<li>
										<h6 className="tyn-title-overline">Change Theme</h6>
										<ul className="tyn-chat-theme-list">
											<li>
												<button className="tyn-chat-theme-btn" data-theme="blue" />
											</li>
											<li>
												<button className="tyn-chat-theme-btn" data-theme="indigo" />
											</li>
											<li>
												<button className="tyn-chat-theme-btn" data-theme="green" />
											</li>
											<li>
												<button className="tyn-chat-theme-btn" data-theme="red" />
											</li>
										</ul>
									</li>
									<li>
										<h6 className="tyn-title-overline">Change Background</h6>
										<div className="row g-3">
											<div className="col-4">
												<button className="tyn-thumb">
													<img src="assets/images/gallery/chat/thumb-1.jpg" className="tyn-image" alt="" />
												</button>
											</div>
											<div className="col-4">
												<button className="tyn-thumb">
													<img src="assets/images/gallery/chat/thumb-2.jpg" className="tyn-image" alt="" />
												</button>
											</div>
											<div className="col-4">
												<button className="tyn-thumb">
													<img src="assets/images/gallery/chat/thumb-3.jpg" className="tyn-image" alt="" />
												</button>
											</div>
											<div className="col-4">
												<button className="tyn-thumb">
													<img src="assets/images/gallery/chat/thumb-4.jpg" className="tyn-image" alt="" />
												</button>
											</div>
											<div className="col-4">
												<button className="tyn-thumb">
													<img src="assets/images/gallery/chat/thumb-5.jpg" className="tyn-image" alt="" />
												</button>
											</div>
											<div className="col-4">
												<button className="tyn-thumb">
													<img src="assets/images/gallery/chat/thumb-6.jpg" className="tyn-image" alt="" />
												</button>
											</div>
										</div>
									</li>
									<li>
										<h6 className="tyn-title-overline">Edit Nicknames</h6>
										<ul className="tyn-media-list gap gap-3">
											<li>
												<div className="tyn-media-group">
													<div className="tyn-media tyn-size-lg">
														<img src="assets/images/avatar/1.jpg" alt="" />
													</div>
													<div className="tyn-media-col">
														<div className="tyn-media-row">
															<h6 className="name">Jasmine Thompson</h6>
														</div>
														<div className="tyn-media-row has-dot-sap">
															<span className="meta">og : Jasmine</span>
														</div>
													</div>
													<div className="tyn-media-option">
														<ul className="tyn-media-option-list">
															<li>
																<button className="btn btn-icon btn-md btn-pill btn-light">
																	{/* pencil-square */}
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
																</button>
															</li>
														</ul>
													</div>
												</div>
											</li>
											<li>
												<div className="tyn-media-group">
													<div className="tyn-media tyn-size-lg">
														<img src="assets/images/avatar/3.jpg" alt="" />
													</div>
													<div className="tyn-media-col">
														<div className="tyn-media-row">
															<h6 className="name">Konstantin Frank</h6>
														</div>
														<div className="tyn-media-row has-dot-sap">
															<span className="meta">og : konstatin nk</span>
														</div>
													</div>
													<div className="tyn-media-option">
														<ul className="tyn-media-option-list">
															<li>
																<button className="btn btn-icon btn-md btn-pill btn-light">
																	{/* pencil-square */}
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
																</button>
															</li>
														</ul>
													</div>
												</div>
											</li>
										</ul>
									</li>
								</ul>
							</div>

							<div className="tab-pane" id="chat-options-manage" tabIndex={0}>
								<ul className="tyn-media-list gap gap-3">
									<li>
										<a href="#" className="tyn-file">
											<div className="tyn-media-group">
												<div className="tyn-media text-bg-light">
													{/* person-x-fill */}
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width={16}
														height={16}
														fill="currentColor"
														className="bi bi-person-x-fill"
														viewBox="0 0 16 16"
													>
														<path
															fillRule="evenodd"
															d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"
														/>
													</svg>
												</div>
												<div className="tyn-media-col">
													<h6 className="name">Block</h6>
													<div className="meta">Frank will no longer be in your contact.</div>
												</div>
											</div>
										</a>
									</li>
									<li>
										<a href="#" className="tyn-file">
											<div className="tyn-media-group">
												<div className="tyn-media text-bg-light">
													{/* exclamation-triangle-fill */}
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width={16}
														height={16}
														fill="currentColor"
														className="bi bi-exclamation-triangle-fill"
														viewBox="0 0 16 16"
													>
														<path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
													</svg>
												</div>
												<div className="tyn-media-col">
													<h6 className="name">Report</h6>
													<div className="meta">Give feedback on the conversation</div>
												</div>
											</div>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatContentAside;
