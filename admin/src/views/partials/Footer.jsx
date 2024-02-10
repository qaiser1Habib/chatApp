const Footer = () => {
	const handleScroll = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};
	return (
		<>
			<footer
				className="footer-wrapper footer-layout1 mt-auto"
				data-bg-src="assets/img/bg/bg-shape-4.png"
				style={{ backgroundImage: 'url("assets/img/bg/bg-shape-4.png")' }}
			>
				<div className="widget-area">
					<div className="container">
						<div className="row justify-content-between">
							<div className="col-md-6 col-lg-3 col-xl-3">
								<div className="widget footer-widget">
									<div className="footer1-logo bg-white">
										<a href="index.php">
											<img src="assets/WTHellspital_final.png" alt="Logo" />
										</a>
									</div>
								</div>
							</div>
							<div className="col-md-6 col-lg-3 col-xl-3">
								<div className="widget footer-widget">
									<h3 className="widget_title">About Us</h3>
									<div className="vs-widget-about">
										<p>
											Our Emergency Department is equipped to handle a wide range of medical emergencies, from minor
											injuries to critical conditions.
										</p>
									</div>
								</div>
							</div>
							<div className="col-md-6 col-lg-auto col-xl-auto">
								<div className="widget footer-widget widget_nav_menu">
									<h3 className="widget_title">Useful Links</h3>
									<div className="menu-all-pages-container">
										<ul className="menu">
											<li>
												<a href="index.php">HOME</a>
											</li>
											<li>
												<a href="about.php">ABOTU US</a>
											</li>
											<li>
												<a href="hospital.php">OUR HOSPITAL</a>
											</li>
											<li>
												<a href="merch.php">OUR PRODUCTS</a>
											</li>
											<li>
												<a href="contact.php">CONTACT US</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="col-md-6 col-lg-auto col-xl-auto">
								<div className="widget footer-widget widget_nav_menu">
									<h3 className="widget_title">Contact Information</h3>
									<div className="menu-all-pages-container">
										<ul className="menu">
											<li>
												<a>House 1 Street 1 Country</a>
											</li>
											<li>
												<a href="mailto:Info@gmail.com">Info@gmail.com</a>
											</li>
											<li>
												<a href="tel:123456789">123456789</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="py-3 bg-theme">
					<div className="container">
						<div className="row align-items-center justify-content-center">
							<div className="col-auto text-center text-md-end">
								<p className="text-center text-white mb-0">
									Copyright <i className="fa fa-copyright" />
									2023{" "}
									<a href="https://single-solution.com/" style={{ textDecoration: "underline", color: "white" }}>
										Single Solution
									</a>
									. All rights reserved.
								</p>
							</div>
						</div>
					</div>
				</div>
			</footer>

			
			<a onClick={() => handleScroll()} className="scrollToTop scroll-bottom style2 show">
				<i className="fas fa-arrow-alt-up" />
			</a>
		</>
	);
};

export default Footer;
