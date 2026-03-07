"use client";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { LogOutIcon, MenuIcon } from "lucide-react";
import Link from "../ui/link";
import { ROUTES } from "@/data/generalData";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
export default function NavSheet({ id }: { id: string }) {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const media = matchMedia("(min-width: 480px)");
		const handler = () => {
			if (media.matches) setOpen(false);
		};
		media.addEventListener("change", handler);
		return () => media.removeEventListener("change", handler);
	}, []);

	const pathname = usePathname();
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
		<Sheet id={id} open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="xs:hidden" aria-label="פתח תפריט">
					<MenuIcon aria-hidden />
				</Button>
			</SheetTrigger>
			<SheetContent side="right" className="w-72" dir="rtl">
				<SheetHeader>
					<SheetTitle className="sr-only">תפריט ניווט</SheetTitle>
				</SheetHeader>

				<ul className="flex flex-col flex-1 gap-1 pt-6">
					{ROUTES.map((item) => (
						<li key={item.label}>
							<Link
								label={item.label}
								href={item.href}
								onClick={() => setOpen(false)}
								className={cn(
									"block rounded-md px-4 py-3 clamp-sm font-medium transition-colors",
									"focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring",
									pathname === item.href
										? "bg-accent text-accent-foreground"
										: "text-foreground hover:bg-accent hover:text-accent-foreground"
								)}
							>
								{item.label}
							</Link>
						</li>
					))}
				</ul>
				{isAuthenticated ? (
					<div className=" border-t py-2">
						<div className="px-4 py-2 text-sm text-foreground font-bold">שלום, {user?.name}</div>
						<button
							onClick={handleSignOut}
							className={cn(
								"w-full rounded-md px-4 py-3 text-start text-sm font-medium text-destructive transition-colors",
								"hover:bg-destructive/10 focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring"
							)}
						>
							<LogOutIcon className="ml-2 inline size-4" />
							התנתקות
						</button>
					</div>
				) : (
					<div className="mt-6 border-t pt-4 px-4">
						<Button className="w-full" asChild onClick={() => setOpen(false)}>
							<Link label="התחברות" href="/sign-in">
								התחברות / הרשמה
							</Link>
						</Button>
					</div>
				)}
			</SheetContent>
		</Sheet>
	);
}
