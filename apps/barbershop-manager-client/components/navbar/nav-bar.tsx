import { cn } from "@/lib/utils";
import Link from "../ui/link";
import NavList from "./nav-list";
import NavCart from "./nav-cart";

import NavUser from "./nav-user";
import NavSheet from "./nav-sheet";

export default function Navbar() {
	return (
		<header
			role="banner"
			className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
		>
			<nav
				className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6"
				aria-label="ניווט ראשי"
			>
				{/* Mobile menu - Sheet */}
				<NavSheet id="nav" />
				<div className=" gap-4 hidden xs:flex ">
					{/* Logo */}
					<Link
						href="/"
						label="בית"
						className={cn(
							"flex h-10 w-24 shrink-0 items-center justify-center rounded-md border border-dashed border-border bg-muted text-muted-foreground",
							"transition-colors hover:border-muted-foreground/50 hover:bg-muted/80",
							"focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring"
						)}
						aria-label="חזרה לדף הבית"
					>
						<span className="clamp-sm font-medium">לוגו</span>
					</Link>
					{/* Desktop nav items */}
					<NavList />
				</div>

				{/* Right side actions - Cart and User menu */}
				<div className="flex items-center gap-2">
					{/* Cart button - links to cart page */}
					<NavCart />
					{/* User / Login section */}
					<NavUser id="nav" />
				</div>
			</nav>
		</header>
	);
}
