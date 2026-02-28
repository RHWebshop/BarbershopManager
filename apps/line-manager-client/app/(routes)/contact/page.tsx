import { Facebook, Instagram } from "@/components/ui/icons";
import { MailIcon, MessageCircleIcon, PhoneIcon, MapIcon, ClockIcon } from "lucide-react";

export function Contact() {
	return (
		<div className="space-y-10">
			{/* Page Header */}
			<div className="space-y-2">
				<h1 className="text-4xl font-extrabold tracking-tight">צור קשר</h1>
				<p className="text-lg text-muted-foreground">אנחנו זמינים עבורכם בכל אחת מהדרכים הבאות</p>
			</div>

			{/* ── Direct Contact ── */}
			<section className="space-y-4">
				<h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">יצירת קשר ישיר</h2>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
					<ContactCard
						href="tel:0501234567"
						icon={<PhoneIcon className="size-5" />}
						label="התקשרו אלינו"
						value="050-123-4567"
					/>
					<ContactCard
						href="https://wa.me/972501234567"
						icon={<MessageCircleIcon className="size-5" />}
						label="וואטסאפ"
						value="שלחו הודעה"
						external
					/>
					<ContactCard
						href="mailto:office@example.com"
						icon={<MailIcon className="size-5" />}
						label="אימייל"
						value="office@example.com"
					/>
				</div>
			</section>

			{/* ── Social Media ── */}
			<section className="space-y-4">
				<h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">עקבו אחרינו</h2>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<ContactCard
						href="https://instagram.com"
						icon={<Instagram className="size-5" />}
						label="אינסטגרם"
						value="@place_name"
						external
					/>
					<ContactCard
						href="https://facebook.com"
						icon={<Facebook className="size-5" />}
						label="פייסבוק"
						value="Place Name"
						external
					/>
				</div>
			</section>

			{/* ── Location ── */}
			<section className="space-y-4">
				<h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">הגעה אלינו</h2>

				<ContactCard
					href="https://waze.com/ul?q=רחוב הירקון 12 תל אביב"
					icon={<MapIcon className="size-5" />}
					label="נווטו אלינו (Waze)"
					value="רחוב העיר 12, תל אביב"
					external
				/>
			</section>

			{/* ── Availability ── */}
			<div className="flex items-start gap-4 rounded-xl border border-border bg-muted/30 p-6">
				<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
					<ClockIcon className="size-5" />
				</div>
				<div>
					<h3 className="font-bold">שעות פעילות</h3>
					<p className="mt-1 text-sm leading-relaxed text-muted-foreground">
						אנחנו עושים את מירב המאמצים לענות לכל פנייה בהקדם האפשרי. בימי חול המענה הממוצע הוא תוך פחות משעה.
					</p>
				</div>
			</div>
		</div>
	);
}

/* ── Reusable Card ── */

interface ContactCardProps {
	href: string;
	icon: React.ReactNode;
	label: string;
	value: string;
	external?: boolean;
}

function ContactCard({ href, icon, label, value, external }: ContactCardProps) {
	return (
		<a
			href={href}
			{...(external ? { target: "_blank", rel: "noreferrer" } : {})}
			className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md active:scale-[0.99]"
		>
			<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
				{icon}
			</div>
			<div className="min-w-0">
				<p className="text-sm font-bold">{label}</p>
				<p className="truncate text-sm text-muted-foreground">{value}</p>
			</div>
		</a>
	);
}
