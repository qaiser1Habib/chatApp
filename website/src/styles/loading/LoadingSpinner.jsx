const LoadingSpinner = () => {
	return (
		<div className="d-flex">
			<div className="spinner-border mx-auto" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>
	);
};

export default LoadingSpinner;
