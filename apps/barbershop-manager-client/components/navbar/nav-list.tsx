"use client";
import { ROUTES } from "@/data/generalData";
import Link from "../ui/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function NavList() {
	const pathname = usePathname();
	return (
		<ul className="flex items-center gap-1 ">
			{ROUTES.map((item) => {
				const isActive = pathname === item.href;
				return (
					<li key={item.label}>
						<Link
							href={item.href}
							disabled={isActive}
							label={item.label}
							className={cn(
								"rounded-md px-4 py-2 clamp-sm font-medium transition-colors",
								"focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring",
								isActive
									? "bg-accent text-accent-foreground "
									: "text-foreground hover:bg-accent hover:text-accent-foreground"
							)}
						>
							{item.label}
						</Link>
					</li>
				);
			})}
		</ul>
	);
}
