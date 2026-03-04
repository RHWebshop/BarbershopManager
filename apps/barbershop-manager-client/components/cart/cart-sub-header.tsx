"use client";

import { Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { useCartActions, useCartQuantity } from "@/providers/cart-store-provider";

export default function CartSubHeader() {
	const { clearCart } = useCartActions();
	const quantity = useCartQuantity();
	return (
		<div className="w-full flex justify-between items-center">
			<p className="text-lg text-muted-foreground">יש לך {quantity} פריטים בסל הקניות</p>
			<Button
				variant="ghost"
				size="sm"
				onClick={clearCart}
				className="w-fit gap-2 text-muted-foreground hover:text-destructive"
			>
				<Trash2Icon className="size-4" />
				נקה עגלה
			</Button>
		</div>
	);
}
