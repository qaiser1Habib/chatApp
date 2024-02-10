import ChatContent from "./component/Home/ChatContent";
import ChatSideNav from "./component/Home/ChatSideNav";
import Header from "./partials/Header";

const Home = () => {
	return (
		<div className="tyn-root">
			<Header />
			<div className="tyn-content tyn-content-full-height tyn-chat has-aside-base">
				<ChatSideNav />
				<ChatContent />
			</div>
		</div>
	);
};

export default Home;
