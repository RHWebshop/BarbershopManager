"use client";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "@/components/ui/link";
import { CartEmpty, CartItemCard, CartPolicies, CartHeader, CartSummary } from "@/components/cart";
import { useCartProducts } from "@/providers/cart-store-provider";

export default function Cart() {
	const products = useCartProducts();

	if (products.length === 0) {
		return <CartEmpty />;
	}

	return (
		<>
			<Button variant="outline" asChild className="gap-2 mb-4">
				<Link href="/store">
					<ArrowRightIcon className="size-4" />
					המשך בקניות
				</Link>
			</Button>

			<CartHeader />

			<div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
				{/* Left Column: Products */}
				<section className="space-y-4">
					<ul className="divide-y divide-border rounded-xl border border-border bg-card shadow-sm  ">
						{products.map(({ product, quantity }, index) => (
							<CartItemCard key={product.id} product={product} quantity={quantity} index={index} />
						))}
					</ul>
				</section>

				{/* Right Column: Summary & Policies */}
				<section>
					<div className="sticky top-20 space-y-6">
						{/* Summary Card */}
						<CartSummary />

						{/* Policies Block */}
						<CartPolicies />
					</div>
				</section>
			</div>
		</>
	);
}
