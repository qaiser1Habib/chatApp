/**
 * Converts the given date to a Date object or formatted string based on a pattern.
 *
 * @param {string|Date} date - The date to convert. Can be a string or Date object.
 * @param {string} [pattern] - The pattern to use for formatting the date string.
 * @returns {(Date|string|null)} A Date object, formatted date string, or null if input is invalid.
 */

export const handleFormDataInput = (event, setFormData) => {
	const { name, value, valueAsNumber, type } = event.target;
	const parts = name.split(".");

	const updateState = (state, parts, value) => {
		const newState = { ...state };
		let currentLevel = newState;

		for (let i = 0; i < parts.length; i++) {
			const part = parts[i];

			// If it's not the last part, continue deep cloning, otherwise set the value
			if (i < parts.length - 1) {
				currentLevel[part] = currentLevel[part] ? { ...currentLevel[part] } : {};
				currentLevel = currentLevel[part];
			} else {
				// Only set the `valueAsNumber` if it's a number and the type of input allows for a numeric value
				currentLevel[part] = type === "number" || type === "range" ? valueAsNumber : value;
			}
		}

		return newState;
	};

	setFormData((prevState) => updateState(prevState || {}, parts, value));
};


export function getTimeDifference(createdAt) {
	const now = new Date();
	const messageDate = new Date(createdAt);
	const timeDifference = now.getTime() - messageDate.getTime();
	const seconds = Math.floor(timeDifference / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (days > 0) {
		return `${days} day${days > 1 ? "s" : ""} ago`;
	} else if (hours > 0) {
		return `${hours} hour${hours > 1 ? "s" : ""} ago`;
	} else if (minutes > 0) {
		return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
	} else {
		return "Just now";
	}
}
export const getSender = (loggedUser, chatUsers) => {
	return chatUsers[0]?._id === loggedUser?._id ? chatUsers[1]?.name : chatUsers[0]?.name;
};

// Function to get the chat image
export const getChatImage = (loggedUser, chatUsers) => {
	return chatUsers[0]?._id === loggedUser._id ? chatUsers[1]?.profileImage : chatUsers[0]?.profileImage;
};

export const isSameSender = (message, m, i, userId) => {
	return (
		i < message.length - 1 &&
		(message[i + 1].sender._id !== m.sender._id || message[i + 1].sender._id === undefined) &&
		message[i].sender._id !== userId
	);
};
export const isLastMessage = (message, i, userId) => {
	return i === message.length - 1 && message[message.length - 1].sender._id !== userId && message[message.length - 1].sender._id;
};
