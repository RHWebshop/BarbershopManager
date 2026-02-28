import { MailIcon } from "lucide-react";
import { Facebook, Instagram } from "./ui/icons";
import { Link } from "./ui";
const currentYear = new Date().getFullYear();
export default function Footer() {
	return (
		<footer className="w-full border-t border-border bg-card py-6 text-card-foreground">
			<div className="mx-auto max-w-6xl px-4 md:px-6">
				<div className="flex flex-col items-center justify-between gap-6 md:flex-row">
					{/* Navigation Links */}
					<nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
						<Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-primary">
							צור קשר
						</Link>
						<Link href="/accessibility" className="text-sm text-muted-foreground transition-colors hover:text-primary">
							הצהרת נגישות
						</Link>
						<Link href="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-primary">
							מדיניות פרטיות
						</Link>
						<Link
							href="mailto:office@example.com"
							className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
						>
							<MailIcon className="size-4" />
							office@example.com
						</Link>
					</nav>

					{/* Social Icons & Copyright */}
					<div className="flex items-center gap-6">
						<div className="flex items-center gap-4">
							<Link
								href="https://instagram.com"
								external
								className="text-muted-foreground transition-colors hover:text-primary"
								aria-label="אינסטגרם"
							>
								<Instagram className="size-5" />
							</Link>
							<Link
								href="https://facebook.com"
								external
								className="text-muted-foreground transition-colors hover:text-primary"
								aria-label="פייסבוק"
							>
								<Facebook className="size-5" />
							</Link>
						</div>

						<div className="h-4 w-px bg-border hidden md:block" />

						<p className="text-xs text-muted-foreground">© {currentYear} כל הזכויות שמורות</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
