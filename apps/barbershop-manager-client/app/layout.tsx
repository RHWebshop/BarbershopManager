import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import QueryProvider from "@/lib/query-provider";

const assistant = localFont({
	src: "./fonts/Assistant.ttf",
	variable: "--font-assistant",
	fallback: ["arial", "sans-serif"],
});

export const metadata: Metadata = {
	title: "Barbershop Manager",
	description: "A simple app to manage your barbershop appointments and services.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={assistant.variable}>
			<body className="anti-aliased">
				<QueryProvider>
					<ReactQueryDevtools initialIsOpen={false} />
					{children}
				</QueryProvider>
			</body>
		</html>
	);
}
