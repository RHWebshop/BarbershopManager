"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "@/components/ui/link";
import { CartEmpty, CartItemCard, CartPolicies, CartSubHeader, CartSummary } from "@/components/cart";
import { useCartProducts } from "@/providers/cart-store-provider";

export default function Cart() {
	const products = useCartProducts();

	if (products.length === 0) {
		return <CartEmpty />;
	}

	return (
		<>
			<div className="flex flex-col gap-2 mb-10 ">
				<h1 className="text-4xl font-extrabold tracking-tight leading-none">עגלת קניות</h1>
				<CartSubHeader />
			</div>

			<section className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
				{/* Left Column: Items */}
				<div className="space-y-4">
					<ul className="divide-y divide-border rounded-xl border border-border bg-card shadow-sm">
						{products.map(({ product, quantity }) => (
							<CartItemCard key={product.id} product={product} quantity={quantity} />
						))}
					</ul>

					<Button variant="outline" asChild className="gap-2">
						<Link href="/store">
							<ArrowLeftIcon className="size-4" />
							המשך בקניות
						</Link>
					</Button>
				</div>

				{/* Left Column: Summary & Policies */}
				<section>
					<div className="sticky top-20 space-y-6">
						{/* Summary Card */}
						<CartSummary />

						{/* Policies Block */}
						<CartPolicies />
					</div>
				</section>
			</section>
		</>
	);
}
