import { useContext } from "react";
import { LoadingContext } from "../context-providers/LoadingProvider";

export const useLoading = () => {
	const loading = useContext(LoadingContext);

	if (!loading) throw new Error("useLoading must be used within a LoadingProvider");

	return loading;
};
