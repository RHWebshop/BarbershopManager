import { useState, useMemo } from "react";
import { useLinesStore } from "@/stores/bookingStore";
import { LINE_SERVICES, TIME_SLOTS } from "@/data/bookingData";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
	CalendarIcon,
	CheckCircle2Icon,
	ClockIcon,
	ScissorsIcon,
	XCircleIcon,
	PlusIcon,
} from "lucide-react";

export function LinePage() {
	const lines = useLinesStore((s) => s.lines);
	const addLine = useLinesStore((s) => s.addLine);
	const cancelLine = useLinesStore((s) => s.cancelLine);

	// ── Booking form state ──
	const [selectedService, setSelectedService] = useState<string | null>(null);
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
	const [selectedTime, setSelectedTime] = useState<string | null>(null);
	const [showForm, setShowForm] = useState(false);
	const [justBooked, setJustBooked] = useState(false);

	// ── Calendar constraints ──
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const twoWeeksFromNow = new Date(today);
	twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);

	// ── Separate upcoming / past lines ──
	const todayStr = useMemo(() => {
		const d = new Date();
		d.setHours(0, 0, 0, 0);
		return d.toISOString().slice(0, 10);
	}, []);

	const { upcoming, past } = useMemo(() => {
		const up = lines
			.filter((l) => l.date >= todayStr && l.status === "confirmed")
			.sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
		const pa = lines
			.filter((l) => l.date < todayStr || l.status === "cancelled")
			.sort((a, b) => b.date.localeCompare(a.date));
		return { upcoming: up, past: pa };
	}, [lines, todayStr]);

	const serviceLookup = LINE_SERVICES.find((s) => s.id === selectedService);

	const canConfirm = selectedService && selectedDate && selectedTime;

	const handleConfirm = () => {
		if (!canConfirm || !serviceLookup || !selectedDate) return;

		const year = selectedDate.getFullYear();
		const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
		const day = String(selectedDate.getDate()).padStart(2, "0");
		const dateStr = `${year}-${month}-${day}`;

		addLine({
			serviceId: serviceLookup.id,
			serviceName: serviceLookup.name,
			date: dateStr,
			time: selectedTime!,
		});

		// Reset form
		setSelectedService(null);
		setSelectedDate(undefined);
		setSelectedTime(null);
		setShowForm(false);
		setJustBooked(true);
		setTimeout(() => setJustBooked(false), 3000);
	};

	const formatDate = (dateStr: string) => {
		const d = new Date(dateStr + "T00:00:00");
		return d.toLocaleDateString("he-IL", {
			weekday: "short",
			day: "numeric",
			month: "short",
		});
	};

	return (
		<div className="space-y-10">
			{/* Page Header */}
			<div className="flex items-start justify-between">
				<div className="space-y-2">
					<h1 className="text-4xl font-extrabold tracking-tight">התורים שלי</h1>
					<p className="text-lg text-muted-foreground">
						צפו בתורים הקיימים או קבעו תור חדש
					</p>
				</div>
				{upcoming.length === 0 && !showForm && (
					<Button onClick={() => setShowForm(true)} className="gap-2">
						<PlusIcon className="size-4" />
						קביעת תור חדש
					</Button>
				)}
				{upcoming.length > 0 && !showForm && (
					<div className="hidden items-center gap-2 rounded-lg bg-muted/50 px-3 py-1.5 md:flex">
						<CheckCircle2Icon className="size-4 text-primary" />
						<span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
							יש לך תור קרוב
						</span>
					</div>
				)}
			</div>

			{/* Success Toast */}
			{justBooked && (
				<div className="flex items-center justify-between gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-primary shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
					<div className="flex items-center gap-3">
						<CheckCircle2Icon className="size-6 shrink-0" />
						<div className="space-y-0.5">
							<p className="font-bold leading-none">התור נקבע בהצלחה!</p>
							<p className="text-xs opacity-80">
								קבענו לך מקום ביומן, נתראה שם.
							</p>
						</div>
					</div>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setJustBooked(false)}
						className="hover:bg-primary/10">
						סגור
					</Button>
				</div>
			)}

			{/* Restriction Alert */}
			{upcoming.length > 0 && (
				<div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4 text-primary">
					<CalendarIcon className="size-5 shrink-0" />
					<p className="text-sm font-medium">
						יש לך כבר תור מאושר במערכת. ניתן לקבוע תור חדש רק לאחר סיום או
						ביטול התור הקיים.
					</p>
				</div>
			)}

			{/* ── New Booking Form ── */}
			{showForm && upcoming.length === 0 && (
				<section className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
					<div className="flex items-center justify-between">
						<h2 className="text-xl font-bold">קביעת תור חדש</h2>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => {
								setShowForm(false);
								setSelectedService(null);
								setSelectedDate(undefined);
								setSelectedTime(null);
							}}>
							ביטול
						</Button>
					</div>

					{/* Step 1 — Service */}
					<div className="space-y-3">
						<h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
							<ScissorsIcon className="size-4" />
							בחרו שירות
						</h3>
						<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
							{LINE_SERVICES.map((service) => (
								<button
									key={service.id}
									onClick={() => setSelectedService(service.id)}
									className={cn(
										"rounded-xl border p-4 text-start transition-all hover:shadow-md",
										selectedService === service.id
											? "border-primary bg-primary/5 ring-2 ring-primary"
											: "border-border bg-card hover:border-primary/30",
									)}>
									<p className="font-bold">{service.name}</p>
									<div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
										<span>{service.duration} דקות</span>
										<span>₪{service.price}</span>
									</div>
								</button>
							))}
						</div>
					</div>

					{/* Step 2 — Date */}
					{selectedService && (
						<div className="space-y-3">
							<h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
								<CalendarIcon className="size-4" />
								בחרו תאריך
							</h3>
							<div className="flex justify-center rounded-xl border border-border bg-background p-2">
								<Calendar
									mode="single"
									selected={selectedDate}
									onSelect={setSelectedDate}
									disabled={[
										{ before: today },
										{ after: twoWeeksFromNow },
									]}
									defaultMonth={today}
									startMonth={today}
									endMonth={twoWeeksFromNow}
								/>
							</div>
						</div>
					)}

					{/* Step 3 — Time */}
					{selectedService && selectedDate && (
						<div className="space-y-3">
							<h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
								<ClockIcon className="size-4" />
								בחרו שעה
							</h3>
							<div className="flex flex-wrap gap-2">
								{TIME_SLOTS.map((time) => (
									<button
										key={time}
										onClick={() => setSelectedTime(time)}
										className={cn(
											"rounded-lg border px-4 py-2 text-sm font-medium transition-all",
											selectedTime === time
												? "border-primary bg-primary text-primary-foreground"
												: "border-border bg-card hover:border-primary/30 hover:shadow-sm",
										)}>
										{time}
									</button>
								))}
							</div>
						</div>
					)}

					{/* Confirm */}
					{canConfirm && (
						<div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-muted/30 p-6">
							<div className="text-center">
								<p className="text-lg font-bold">{serviceLookup?.name}</p>
								<p className="text-muted-foreground">
									{selectedDate &&
										formatDate(
											`${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`,
										)}{" "}
									בשעה {selectedTime}
								</p>
								<p className="mt-1 text-sm font-medium text-muted-foreground">
									₪{serviceLookup?.price}
								</p>
							</div>
							<Button
								size="lg"
								onClick={handleConfirm}
								className="h-12 gap-2 rounded-xl text-lg font-bold shadow-lg shadow-primary/20">
								<CheckCircle2Icon className="size-5" />
								אישור קביעת תור
							</Button>
						</div>
					)}
				</section>
			)}

			{/* ── Upcoming Lines ── */}
			<section className="space-y-4">
				<h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
					תורים קרובים
				</h2>

				{upcoming.length === 0 ? (
					<div className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
						<CalendarIcon className="mx-auto mb-2 size-8" />
						<p className="font-medium">אין תורים קרובים</p>
						<p className="text-sm">קבעו תור חדש כדי להתחיל</p>
					</div>
				) : (
					<div className="space-y-3">
						{upcoming.map((line) => (
							<div
								key={line.id}
								className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:shadow-sm">
								<div className="flex items-center gap-4">
									<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
										<ScissorsIcon className="size-5" />
									</div>
									<div>
										<p className="font-bold">{line.serviceName}</p>
										<p className="text-sm text-muted-foreground">
											{formatDate(line.date)} · {line.time}
										</p>
									</div>
								</div>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => cancelLine(line.id)}
									className="gap-1 text-muted-foreground hover:text-destructive">
									<XCircleIcon className="size-4" />
									ביטול
								</Button>
							</div>
						))}
					</div>
				)}
			</section>

			{/* ── Past Lines ── */}
			{past.length > 0 && (
				<section className="space-y-4">
					<h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
						היסטוריית תורים
					</h2>
					<div className="space-y-2">
						{past.map((line) => (
							<div
								key={line.id}
								className="flex items-center gap-4 rounded-xl border border-border bg-muted/30 p-4 opacity-70">
								<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
									<ScissorsIcon className="size-4" />
								</div>
								<div className="flex-1">
									<p className="font-medium">{line.serviceName}</p>
									<p className="text-sm text-muted-foreground">
										{formatDate(line.date)} · {line.time}
									</p>
								</div>
								{line.status === "cancelled" && (
									<span className="rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-medium text-destructive">
										בוטל
									</span>
								)}
							</div>
						))}
					</div>
				</section>
			)}
		</div>
	);
}
