"use client";
import { ShoppingCartIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "../ui/link";
import { useCartQuantity } from "@/providers/cart-store-provider";

export default function NavCart() {
	const quantity = useCartQuantity(); // Replace with actual cart quantity from your state management
	return (
		<Button variant="ghost" size="icon" className="relative rounded-full size-10 p-2 " asChild>
			<Link label="עגלה" href="/cart">
				<ShoppingCartIcon aria-hidden className="size-6" />
				{quantity > 0 && (
					<span className="absolute top-0 inset-e-0 flex size-5 items-center justify-center rounded-full bg-primary clamp-sm font-medium text-primary-foreground">
						{quantity > 9 ? "9+" : quantity}
					</span>
				)}
			</Link>
		</Button>
	);
}
