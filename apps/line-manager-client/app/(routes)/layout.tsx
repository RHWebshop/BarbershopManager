import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuthStore } from "@/features/auth/store";
import { useEffect } from "react";
import { useMe } from "@/features/auth/api";

export function RouteLayout({children}: {children: React.ReactNode}) {
	const { data: user, isError, isLoading } = useMe();
	const { login, logout, isAuthenticated } = useAuthStore();

	useEffect(() => {
		if (user) {
			login(user);
		} else if (isError) {
			logout();
		}
	}, [user, isError, login, logout]);

	if (isLoading && !isAuthenticated) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen flex-col">
			<Navbar />
			<main className="mx-auto w-full max-w-6xl flex-1 px-4 py-20 md:px-6">
				{children}
			</main>
			<Footer />
		</div>
	);
}
