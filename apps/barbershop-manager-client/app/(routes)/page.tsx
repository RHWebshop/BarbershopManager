"use client";
import { useMemo } from "react";

import { PRODUCTS, CATEGORY_LABELS } from "@/data/storeData";
import { ScissorsIcon, ClockIcon, ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { useAppointments } from "@/stores/appointments-store";
import Link from "@/components/ui/link";
import AspectRatio from "@/components/ui/aspect-ratio";

// ── Placeholder user ──────────────────────────────────────────────────────────
const MOCK_USER = { name: "ישראל" };

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatDate(dateStr: string) {
	const d = new Date(dateStr + "T00:00:00");
	return d.toLocaleDateString("he-IL", {
		weekday: "long",
		day: "numeric",
		month: "long",
	});
}

function getGreeting() {
	const h = new Date().getHours();
	if (h < 12) return "בוקר טוב";
	if (h < 17) return "צהריים טובים";
	return "ערב טוב";
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function HomePage() {
	const appointments = useAppointments();
	// const { addToCart } = useCartActions();

	// Next upcoming confirmed Appointment
	const todayStr = new Date().toISOString().slice(0, 10);
	const nextAppointment = useMemo(() => {
		return (
			appointments
				.filter((l) => l.status === "confirmed" && l.date >= todayStr)
				.sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))[0] ?? null
		);
	}, [appointments, todayStr]);

	// Featured products
	const featuredProducts = useMemo(() => PRODUCTS.filter((p) => p.isFeatured), []);

	return (
		<div className="space-y-10">
			{/* ── Greeting ── */}
			<div className="space-y-2">
				<h1 className="text-4xl font-extrabold tracking-tight">
					{getGreeting()}, {MOCK_USER.name} 👋
				</h1>
				<p className="text-lg text-muted-foreground">מרכז ניהול התורים והחנות שלך</p>
			</div>

			{/* ── Next Appointment ── */}
			<section className="space-y-3">
				<h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">התור הקרוב שלך</h2>

				{nextAppointment ? (
					<div className="flex items-center gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
						<div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
							<ScissorsIcon className="size-6" />
						</div>
						<div className="flex-1">
							<p className="text-xl font-bold leading-tight">{nextAppointment.serviceName}</p>
							<div className="mt-1 flex items-center gap-2 text-muted-foreground">
								<ClockIcon className="size-4" />
								<span>
									{formatDate(nextAppointment.date)} · {nextAppointment.time}
								</span>
							</div>
						</div>
						<Button variant="outline" size="sm" asChild>
							<Link href="/appointments">כל התורים</Link>
						</Button>
					</div>
				) : (
					<div className="flex items-center justify-between rounded-2xl border border-dashed border-border bg-muted/30 p-6">
						<div>
							<p className="font-bold">אין תור קרוב</p>
							<p className="text-sm text-muted-foreground">קבע תור חדש עכשיו</p>
						</div>
						<Button asChild size="sm">
							<Link href="/appointments/new">קביעת תור</Link>
						</Button>
					</div>
				)}
			</section>

			{/* ── Featured Products ── */}
			<section className="space-y-4">
				<div className="flex items-center justify-between">
					<h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">מוצרים מובחרים</h2>
					<Link
						href="/store"
						className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
					>
						לחנות המלאה
						<ArrowLeftIcon className="size-4" />
					</Link>
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{featuredProducts.map((product) => (
						<div
							key={product.id}
							className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md"
						>
							<Link href={`/store/${product.id}`} className="overflow-hidden">
								<AspectRatio ratio={4 / 3} className="overflow-hidden bg-muted">
									<Image src={product.imageUrl} alt={product.name} fill className="size-full object-contain" />
								</AspectRatio>
							</Link>
							<div className="flex flex-1 flex-col gap-3 p-4">
								<div>
									<span className="text-xs font-medium text-muted-foreground">{CATEGORY_LABELS[product.category]}</span>
									<Link href={`/store/${product.id}`}>
										<p className="mt-0.5 font-bold leading-tight hover:text-primary transition-colors">
											{product.name}
										</p>
									</Link>
								</div>
								<div className="mt-auto flex items-center justify-between">
									<span className="text-lg font-bold">₪{product.price}</span>
									<Button
										size="sm"
										variant="outline"
										// onClick={() => addToCart(product)}
									>
										הוסף לעגלה
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
