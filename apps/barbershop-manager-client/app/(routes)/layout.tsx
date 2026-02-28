import { Footer, Navbar } from "@/components";

export default function RouteLayout({ children }: { children: React.ReactNode }) {
	// only check if the user is logged in, if not send them to the login page, otherwise they can see the app
	// const user = useAuthStoreUser();

	return (
		<div className="flex min-h-screen flex-col">
			<Navbar />
			<main className="mx-auto w-full max-w-6xl flex-1 px-4 py-20 md:px-6">{children}</main>
			<Footer />
		</div>
	);
}
