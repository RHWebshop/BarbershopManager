import { TruckIcon } from "lucide-react";

export default function CartPolicies() {
	return (
		<div className="rounded-xl border border-border bg-muted/30 p-6 flex flex-col gap-4">
			<h3 className="flex items-center gap-2 clamp-base font-bold">
				<TruckIcon className="size-6" />
				מדיניות משלוחים
			</h3>
			<ul className=" space-y-3 clamp-sm text-muted-foreground">
				<li className="flex gap-2">
					<span className="size-1.5 shrink-0 rounded-full bg-primary mt-1.5" />
					<span>
						<strong>משלוח חינם</strong> לכל חלקי הארץ ברכישה מעל ₪199.
					</span>
				</li>
				<li className="flex gap-2">
					<span className="size-1.5 shrink-0 rounded-full bg-primary mt-1.5" />
					<span>אספקה תוך 3-5 ימי עסקים לרוב חלקי הארץ.</span>
				</li>
				<li className="flex gap-2">
					<span className="size-1.5 shrink-0 rounded-full bg-primary mt-1.5" />
					<span>ניתן להחזיר מוצרים תוך 14 יום באריזתם המקורית.</span>
				</li>
			</ul>
		</div>
	);
}
