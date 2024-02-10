import { toast, Slide } from "react-toastify";

export const useToast = () => {
	const toastPreferences = {
		position: toast.POSITION.TOP_RIGHT,
		autoClose: 3000,
		transition: Slide,
		hideProgressBar: true,
		closeButton: true,
		style: { color: "#e8431f" },
	};

	const toastTypes = {
		success: toast.success,
		error: toast.error,
		warning: toast.warn,
		info: toast.info,
		default: toast,
	};

	const notify = (type = "default", message, customConfig = {}) => {
		const toastFunc = toastTypes[type] || toastTypes.default;

		toastFunc(message, {
			...toastPreferences,
			...customConfig,
		});
	};

	return { notify };
};
