import { MailIcon } from "lucide-react";
import { Facebook, Instagram } from "./ui/icons";
import Link from "./ui/link";

const currentYear = new Date().getFullYear();
export default function Footer() {
	return (
		<footer className="w-full border-t border-border bg-card py-6 text-card-foreground">
			<div className="mx-auto max-w-6xl px-4 md:px-6">
				<div className="flex flex-col items-center justify-between gap-6 md:flex-row">
					{/* Navigation Links */}
					<nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
						<Link
							label="צור קשר"
							href="/contact"
							className="clamp-sm text-muted-foreground transition-colors hover:text-primary"
						>
							צור קשר
						</Link>
						<Link
							label="הצהרת נגישות"
							href="/accessibility"
							className="clamp-sm text-muted-foreground transition-colors hover:text-primary"
						>
							הצהרת נגישות
						</Link>
						<Link
							label="מדיניות פרטיות"
							href="/privacy"
							className="clamp-sm text-muted-foreground transition-colors hover:text-primary"
						>
							מדיניות פרטיות
						</Link>
						<Link
							label="אימייל"
							href="mailto:office@example.com"
							className="flex items-center gap-2 clamp-sm text-muted-foreground transition-colors hover:text-primary"
						>
							<MailIcon className="size-4" />
							office@example.com
						</Link>
					</nav>

					{/* Social Icons & Copyright */}
					<div className="flex items-center gap-6">
						<div className="flex items-center gap-4">
							<Link
								label="אינסטגרם"
								href="https://instagram.com"
								external
								className="text-muted-foreground transition-colors hover:text-primary"
								aria-label="אינסטגרם"
							>
								<Instagram className="size-6" />
							</Link>
							<Link
								label="פייסבוק"
								href="https://facebook.com"
								external
								className="text-muted-foreground transition-colors hover:text-primary"
								aria-label="פייסבוק"
							>
								<Facebook className="size-6" />
							</Link>
						</div>

						<div className="h-4 w-px bg-border hidden md:block" />

						<p className="clamp-sm text-muted-foreground">© {currentYear} כל הזכויות שמורות</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
