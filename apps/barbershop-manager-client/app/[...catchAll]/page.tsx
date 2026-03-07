import { redirect } from "next/navigation";

// TODO: if user is authenticated, redirect to home page, else redirect to login page. This is a catch-all route that will catch any undefined routes and redirect accordingly.
export default function CatchAll() {
	const user = true; // Simulate user authentication status (replace with actual auth logic)
	if (user) redirect("/");
	else {
		redirect("/login");
	}
}
