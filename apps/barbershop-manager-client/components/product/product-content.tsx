"use client";

import { MinusIcon, PlusIcon, ShareIcon, ShoppingCartIcon, ChevronLeftIcon } from "lucide-react";
import Link from "../ui/link";
import AspectRatio from "../ui/aspect-ratio";
import Image from "next/image";
import { Product } from "@barbershop-manager/types";
import { CATEGORY_LABELS } from "@/data/storeData";
import { Button } from "../ui/button";
// import { useQuery } from "@tanstack/react-query";

export default function ProductContent({ product }: { product: Product }) {
	// const { data: product } = useQuery({
	// 	queryKey: [productId, "product"],
	// 	queryFn: () => getProduct(productId),
	// });
	return (
		<div className="space-y-10">
			Breadcrumbs / Navigation
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
