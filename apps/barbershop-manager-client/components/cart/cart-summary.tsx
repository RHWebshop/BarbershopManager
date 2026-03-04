"use client";
import { CreditCardIcon, ShieldCheckIcon, TruckIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useCartPrice, useCartQuantity } from "@/providers/cart-store-provider";

export default function CartSummary() {
	const quantity = useCartQuantity();
	const totalPrice = useCartPrice();
	return (
		<div className="rounded-xl border border-border bg-card p-6 shadow-sm">
			<h2 className="text-xl font-bold">סיכום הזמנה</h2>

			<div className="mt-6 space-y-4">
				<div className="flex justify-between text-sm">
					<span className="text-muted-foreground">סיכום ביניים ({quantity} פריטים)</span>
					<span>₪{totalPrice}</span>
				</div>
				<div className="flex justify-between text-sm">
					<span className="text-muted-foreground">משלוח</span>
					<span className="font-medium text-green-600">חינם!</span>
				</div>

				<div className="border-t border-dashed border-border pt-4">
					<div className="flex justify-between text-xl font-black">
						<span>סה&quot;כ לתשלום</span>
						<span className="text-primary">₪{totalPrice}</span>
					</div>
					<p className="mt-1 text-xs text-muted-foreground">המחיר כולל מע&quot;מ</p>
				</div>

				<Button className="h-12 w-full text-lg font-bold shadow-lg shadow-primary/20" size="lg">
					מעבר לתשלום
				</Button>
			</div>
			{/* Guarantees */}
			<div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6">
				<div className="flex flex-col items-center gap-1 text-center">
					<div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
						<TruckIcon className="size-4" />
					</div>
					<span className="text-[10px] font-bold leading-tight">משלוח מהיר</span>
				</div>
				<div className="flex flex-col items-center gap-1 text-center">
					<div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
						<ShieldCheckIcon className="size-4" />
					</div>
					<span className="text-[10px] font-bold leading-tight">אחריות מלאה</span>
				</div>
				<div className="flex flex-col items-center gap-1 text-center">
					<div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
						<CreditCardIcon className="size-4" />
					</div>
					<span className="text-[10px] font-bold leading-tight">תשלום מאובטח</span>
				</div>
			</div>
		</div>
	);
}
