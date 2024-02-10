import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
	const [showNav, setShowNav] = useState(false);

	return (
		<>
			<header className="header-wrapper header-layout1">
				<div className="header-top bg-title py-2 d-none d-md-block">
					<div className="container py-1">
						<div className="row justify-content-center justify-content-xl-between">
							<div className="col-auto">
								<ul className="header-top-info list-unstyled m-0">
									<li>
										<i className="far fa-envelope" />
										<a to="mailto:Info@gmail.com" className="text-reset">
											Info@gmail.com
										</a>
									</li>
									<li>
										<i className="far fa-map-marker-alt" />
										House 1 Street 1 Country
									</li>
								</ul>
							</div>
							<div className="col-auto d-none d-xl-block">
								<ul className="head-top-links text-end">
									<li>
										<ul className="header-social">
											<li>
												<a href="#">
													<i className="fab fa-facebook-f" />
												</a>
											</li>
											<li>
												<a href="#">
													<i className="fab fa-twitter" />
												</a>
											</li>
											<li>
												<a href="#">
													<i className="fab fa-linkedin-in" />
												</a>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<div className={`vs-menu-wrapper ${showNav ? "vs-body-visible" : ""} d-block d-lg-none`}>
					<div className="vs-menu-area text-center">
						<button className="vs-menu-toggle" onClick={() => setShowNav(false)}>
							<i className="fal fa-times" />
						</button>
						<div className="mobile-logo">
							<Link to="/" onClick={() => setShowNav(false)}>
								<img src="assets/WTHellspital_final.png" width={100} alt="Medixi" />
							</Link>
						</div>
						<div className="vs-mobile-menu">
							<ul>
								<li className="menu-item-has-children">
									<NavLink to="/" onClick={() => setShowNav(false)}>
										Home
									</NavLink>
								</li>
								<li>
									<NavLink to="/about" onClick={() => setShowNav(false)}>
										About Us
									</NavLink>
								</li>
								<li className="menu-item-has-children">
									<NavLink to="/hospital" onClick={() => setShowNav(false)}>
										Our Hospitals
									</NavLink>
								</li>
								<li className="menu-item-has-children">
									<NavLink to="/product" onClick={() => setShowNav(false)}>
										Our Products
									</NavLink>
								</li>
								<li>
									<NavLink to="/contact" onClick={() => setShowNav(false)}>
										Contact Us
									</NavLink>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="sticky-wrap" style={{}}>
					<div className="sticky-active">
						<div className="header-main">
							<div className="container position-relative">
								<div className="row align-items-center justify-content-between">
									<div className="col-auto col-xl-3 col-xxl-auto d-flex">
										<div className="header1-logo">
											<Link to="/">
												<img src="assets/WTHellspital_final.png" width={150} alt="Logo" />
											</Link>
										</div>
									</div>
									<div className="col-auto col-xl-9 col-xxl-auto py-3 py-lg-0">
										<div className="row justify-content-xl-between justify-content-xxl-end align-items-center">
											<div className="col-auto">
												<nav className="main-menu menu-style1 d-none d-lg-block">
													<ul>
														<li className=" mega-menu-wrap">
															<NavLink to="/">
																<span className="has-new-label">HOME </span>
															</NavLink>
														</li>
														<li>
															<NavLink to="/about">ABOUT US</NavLink>
														</li>
														<li className="">
															<NavLink to="/hospital">OUR HOSPITALS</NavLink>
														</li>
														<li className="">
															<NavLink to="/product">OUR PRODUCTS</NavLink>
														</li>
														<li>
															<NavLink to="/contact">CONTACT US</NavLink>
														</li>
													</ul>
												</nav>
												<button onClick={() => setShowNav(true)} className="vs-menu-toggle d-inline-block d-lg-none">
													<i className="fas fa-bars" />
												</button>
											</div>
											<div className="col-auto d-none d-xl-block">
												<div className="header-btn">
													<Link to="/cart" className="icon-btn has-badge d-none d-xxl-inline-block">
														<i className="far fa-shopping-cart" />
														<span className="badge">3</span>
													</Link>
													<Link to="/login" className="vs-btn">
														Login
													</Link>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
