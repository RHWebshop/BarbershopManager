"use client";
import { LogOutIcon, UserIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "../ui/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function NavUser({ id }: { id: string }) {
	const user = {
		name: "משתמש לדוגמה",
		phone: "050-1234567",
	}; // Replace with actual user data from your authentication state
	const handleSignOut = () => {
		// Implement sign-out logic here
		console.log("Signing out...");
	};
	const isAuthenticated = true; // Replace with actual authentication state
	return (
		<div className="hidden xs:block">
			{isAuthenticated ? (
				<DropdownMenu>
					<DropdownMenuTrigger asChild id={id}>
						<Button variant="ghost" size="icon" aria-label="תפריט משתמש">
							<UserIcon aria-hidden />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-56" id={id}>
						<DropdownMenuLabel>
							<div className="flex flex-col space-y-1">
								<p className="text-sm font-medium leading-none">שלום, {user?.name}</p>
								<p className="text-xs leading-none text-muted-foreground" dir="ltr">
									{user?.phone}
								</p>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem variant="destructive" onClick={handleSignOut} className="cursor-pointer text-destructive">
							<LogOutIcon className="ml-2 size-4" />
							התנתקות
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<Button variant="outline" size="sm" asChild>
					<Link label="התחברות" href="/sign-in">
						התחברות
					</Link>
				</Button>
			)}
		</div>
	);
}
