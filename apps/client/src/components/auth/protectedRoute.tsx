import { useIsAwaitingOtp } from "@/stores/authStore";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const location = useLocation();
	const isAwaitingOtp = useIsAwaitingOtp();
	if (isAwaitingOtp) {
		return <Navigate to="/sign-in" state={{ from: location }} replace />;
	}
	return children;
}
