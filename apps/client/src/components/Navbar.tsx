import { useState } from "react";
import { MenuIcon, ShoppingCartIcon, UserIcon, LogOutIcon } from "lucide-react";
import { useCartStore, selectTotalCount } from "@/features/cart/store";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
	{ label: "בית", to: "/" },
	{ label: "חנות", to: "/store" },
	{ label: "קביעת תור", to: "/line" },
	{ label: "צור קשר", to: "/contact" },
] as const;

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
	cn(
		"rounded-md px-4 py-2 text-sm font-medium transition-colors",
		"focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring",
		isActive
			? "bg-accent text-accent-foreground"
			: "text-foreground hover:bg-accent hover:text-accent-foreground",
	);

import { useAuthStore } from "@/features/auth/store";

export function Navbar() {
	const location = useLocation();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const cartCount = useCartStore(selectTotalCount);

	const { user, isAuthenticated, logout } = useAuthStore();

	const handleSignOut = () => {
		logout();
		setMobileMenuOpen(false);
	};

	return (
		<header
			role="banner"
			className="sticky top-0 z-50 w-full shadow-sm bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 ">
			<nav
				className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6"
				aria-label="ניווט ראשי">
				{/* Logo placeholder */}
				<Link
					to="/"
					className={cn(
						"flex h-10 w-24 shrink-0 items-center justify-center rounded-md border border-dashed border-border bg-muted text-muted-foreground",
						"transition-colors hover:border-muted-foreground/50 hover:bg-muted/80",
						"focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring",
					)}
					aria-label="חזרה לדף הבית">
					<span className="text-xs font-medium">לוגו</span>
				</Link>

				{/* Desktop nav items */}
				<ul className="hidden w-full gap-1 md:flex">
					{NAV_ITEMS.map((item) => (
						<li key={item.label}>
							<NavLink to={item.to} className={navLinkClass}>
								{item.label}
							</NavLink>
						</li>
					))}
				</ul>

				{/* Right side actions - Cart and User menu */}
				<div className="flex items-center gap-2">
					{/* Cart button - links to cart page */}
					<Button
						variant="ghost"
						size="icon"
						className="relative"
						aria-label={`עגלת קניות, ${cartCount} פריטים`}
						asChild>
						<Link to="/cart">
							<ShoppingCartIcon aria-hidden />
							{cartCount > 0 && (
								<span className="absolute -top-1 -inset-e-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
									{cartCount}
								</span>
							)}
						</Link>
					</Button>

					{/* User / Login section */}
					{isAuthenticated ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									aria-label="תפריט משתמש">
									<UserIcon aria-hidden />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-56">
								<DropdownMenuLabel>
									<div className="flex flex-col space-y-1">
										<p className="text-sm font-medium leading-none">
											שלום, {user?.name}
										</p>
										<p
											className="text-xs leading-none text-muted-foreground"
											dir="ltr">
											{user?.phone}
										</p>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									variant="destructive"
									onClick={handleSignOut}
									className="cursor-pointer text-destructive">
									<LogOutIcon className="ml-2 size-4" />
									התנתקות
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Button variant="outline" size="sm" asChild>
							<Link to="/sign-in">התחברות</Link>
						</Button>
					)}

					{/* Mobile menu - Sheet */}
					<Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="md:hidden"
								aria-label="פתח תפריט">
								<MenuIcon aria-hidden />
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-72" dir="rtl">
							<SheetHeader>
								<SheetTitle className="sr-only">תפריט ניווט</SheetTitle>
							</SheetHeader>
							<ul className="flex flex-col gap-1 pt-6">
								{NAV_ITEMS.map((item) => (
									<li key={item.label}>
										<Link
											to={item.to}
											onClick={() => setMobileMenuOpen(false)}
											className={cn(
												"block rounded-md px-4 py-3 text-sm font-medium transition-colors",
												"focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring",
												location.pathname === item.to
													? "bg-accent text-accent-foreground"
													: "text-foreground hover:bg-accent hover:text-accent-foreground",
											)}>
											{item.label}
										</Link>
									</li>
								))}
							</ul>
							{isAuthenticated ? (
								<div className="mt-6 border-t pt-4">
									<div className="px-4 py-2 text-sm text-foreground font-bold">
										שלום, {user?.name}
									</div>
									<button
										onClick={handleSignOut}
										className={cn(
											"w-full rounded-md px-4 py-3 text-start text-sm font-medium text-destructive transition-colors",
											"hover:bg-destructive/10 focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring",
										)}>
										<LogOutIcon className="ml-2 inline size-4" />
										התנתקות
									</button>
								</div>
							) : (
								<div className="mt-6 border-t pt-4 px-4">
									<Button
										className="w-full"
										asChild
										onClick={() => setMobileMenuOpen(false)}>
										<Link to="/sign-in">התחברות / הרשמה</Link>
									</Button>
								</div>
							)}
						</SheetContent>
					</Sheet>
				</div>
			</nav>
		</header>
	);
}
