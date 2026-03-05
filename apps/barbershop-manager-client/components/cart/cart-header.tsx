"use client";

import { Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { useCartActions, useCartQuantity } from "@/providers/cart-store-provider";

export default function CartHeader() {
	const { clearCart } = useCartActions();
	const quantity = useCartQuantity();
	return (
		<div className="flex flex-col gap-2 mb-10 ">
			<h1 className="text-4xl font-extrabold tracking-tight leading-none">עגלת קניות</h1>
			<div className="w-full flex justify-between items-center">
				<p className="text-lg text-muted-foreground">יש לך {quantity} פריטים בסל הקניות</p>
				<Button variant="destructive" size="sm" onClick={clearCart} className="w-fit gap-2  ">
					<Trash2Icon className="size-4" />
					נקה עגלה
				</Button>
			</div>
		</div>
	);
}
