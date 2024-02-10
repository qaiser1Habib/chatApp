import { createContext, useState } from "react";

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
	const [isFetchingApi, setIsFetchingApi] = useState(false);
	const [isBuildingApp, setIsBuildingApp] = useState(false);
	const [isUpdatingData, setIsUpdatingData] = useState(false);

	return (
		<LoadingContext.Provider
			value={{ isFetchingApi, setIsFetchingApi, isBuildingApp, setIsBuildingApp, isUpdatingData, setIsUpdatingData }}>
			{children}
		</LoadingContext.Provider>
	);
};
