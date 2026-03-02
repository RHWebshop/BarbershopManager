"use client";
import { PRODUCTS, CATEGORY_LABELS } from "@/data/storeData";
import { Button } from "@/components/ui/button";
import {
	ArrowRightIcon,
	MinusIcon,
	PlusIcon,
	ShareIcon,
	ShoppingCartIcon,
	ChevronLeftIcon,
	InfoIcon,
} from "lucide-react";

import Image from "next/image";
import Link from "@/components/ui/link";
import AspectRatio from "@/components/ui/aspect-ratio";
import { useCartActions, useCartProductQuantity } from "@/stores/cart-store";
const productId = "1"; // Replace with dynamic ID as needed
export default function ProductPage({ params }: { params: { productId: string } }) {
	// const { productId } = await params;
	console.log("Rendering ProductPage for productId:", productId);
	const product = PRODUCTS.find((p) => p.id === productId);
	console.log(product);
	const { addToCart, updateQuantity } = useCartActions();
	const quantity = useCartProductQuantity(productId);

	if (!product) {
		return (
			<div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4 py-12 text-center">
				<div className="rounded-full bg-muted p-4">
					<InfoIcon className="size-8 text-muted-foreground" />
				</div>
				<div className="space-y-2">
					<h1 className="text-2xl font-bold">המוצר לא נמצא</h1>
					<p className="max-w-75 text-muted-foreground">המוצר שחיפשתם אינו קיים במלאי או שהוסר מהחנות.</p>
				</div>
				<Button variant="outline" asChild className="mt-4">
					<Link href="/store">
						<ArrowRightIcon className="me-2 size-4 transition-transform group-hover:-translate-x-1" />
						חזרה לחנות
					</Link>
				</Button>
			</div>
		);
	}

	const handleShare = async () => {
		const url = window.location.href;
		if (navigator.share) {
			try {
				await navigator.share({ title: product.name, url });
			} catch {
				// User cancelled or share failed — ignore
			}
		} else {
			await navigator.clipboard.writeText(url);
			// Could show a toast here
		}
	};

	const handleAdd = () => addToCart(product);
	const handleIncrement = () => updateQuantity(product.id, quantity + 1);
	const handleDecrement = () => updateQuantity(product.id, quantity - 1);

	return (
		<div className="space-y-10">
			{/* Breadcrumbs / Navigation */}
			<nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
				<Link href="/store" className="hover:text-primary hover:underline">
					חנות
				</Link>
				<ChevronLeftIcon className="size-4 shrink-0" />
				<span className="font-medium text-foreground">{product.name}</span>
			</nav>

			<div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
				<div className="w-full">
					<AspectRatio ratio={4 / 3} className="overflow-hidden rounded-2xl bg-muted shadow-xl">
						<Image src={product.imageUrl} alt={product.name} fill className="size-full object-contain" />
						<div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/10" />
					</AspectRatio>
				</div>

				{/* Right: Details & Actions */}
				<div className="flex flex-col justify-center space-y-8">
					<div className="space-y-4">
						<span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
							{CATEGORY_LABELS[product.category]}
						</span>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{product.name}</h1>
						<div className="flex items-baseline gap-4">
							<span className="text-3xl font-black text-primary">₪{product.price}</span>
							{product.price > 100 && <span className="text-sm font-medium text-green-600">משלוח חינם</span>}
						</div>
					</div>

					<p className="text-lg leading-relaxed text-muted-foreground">{product.description}</p>

					<div className="space-y-6 pt-4">
						{/* Purchase Controls */}
						<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
							{quantity === 0 ? (
								<Button
									onClick={handleAdd}
									size="lg"
									className="min-h-14 flex-1 gap-3 rounded-xl text-lg font-bold shadow-lg shadow-primary/30 active:scale-[0.98]"
								>
									<ShoppingCartIcon className="size-5" />
									הוסף לסל הקניות
								</Button>
							) : (
								<div className="flex flex-1 items-center gap-2 overflow-hidden rounded-xl border-2 border-primary/20 bg-muted/30 p-1">
									<div className="flex items-center gap-1">
										<Button
											variant="ghost"
											size="icon"
											onClick={handleDecrement}
											className="size-12 rounded-lg hover:bg-background"
											aria-label="הפחת כמות"
										>
											<MinusIcon className="size-5" />
										</Button>
										<span className="min-w-12 text-center text-xl font-black">{quantity}</span>
										<Button
											variant="ghost"
											size="icon"
											onClick={handleIncrement}
											className="size-12 rounded-lg hover:bg-background"
											aria-label="הוסף כמות"
										>
											<PlusIcon className="size-5" />
										</Button>
									</div>
									<div className="mx-2 h-8 w-px bg-primary/20" />
									<div className="flex-1 text-center font-bold text-primary">פריטים בסל</div>
								</div>
							)}

							<Button
								variant="outline"
								size="lg"
								onClick={handleShare}
								className="h-14 gap-2 rounded-xl border-2 font-bold transition-all hover:bg-accent sm:w-auto"
							>
								<ShareIcon className="size-5" />
								<span className="sm:hidden">שיתוף מוצר</span>
							</Button>
						</div>

						{/* Total Indicator */}
						{quantity > 0 && (
							<div className="flex items-center gap-2 rounded-lg bg-primary/5 p-4 text-primary">
								<ShoppingCartIcon className="size-4" />
								<span className="font-semibold">סה&quot;כ בעגלה: ₪{product.price * quantity}</span>
								<Link href="/cart" className="ms-auto text-sm font-bold underline transition-opacity hover:opacity-80">
									מעבר לסל
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
