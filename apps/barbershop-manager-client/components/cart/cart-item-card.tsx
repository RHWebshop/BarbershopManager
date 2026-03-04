"use client";
import { useCartActions } from "@/providers/cart-store-provider";
import { Product } from "@barbershop-manager/types";
import Link from "../ui/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { MinusIcon, PlusIcon, XIcon } from "lucide-react";
import AspectRatio from "../ui/aspect-ratio";

export default function CartItemCard({ product, quantity }: { product: Product; quantity: number }) {
	const { removeFromCart, updateQuantity } = useCartActions();
	return (
		<li key={product.id} className="flex h-full w-full gap-4 p-4 transition-colors hover:bg-muted/30 sm:p-6">
			{/* Product image */}
			<Link
				href={`/store/${product.id}`}
				className="relative flex flex-1  shrink-0 overflow-hidden rounded-lg bg-muted"
			>
				<AspectRatio ratio={1} className="size-full">
					<Image
						src={product.imageUrl}
						fill
						alt={product.name}
						className="size-full object-cover border border-border rounded-lg aspect-square"
						loading="lazy"
					/>
				</AspectRatio>
			</Link>

			{/* Details */}
			<div className="flex  flex-col justify-between py-1 flex-3">
				<div className="space-y-1">
					<div className="flex items-start justify-between gap-4">
						<Link
							href={`/store/${product.id}`}
							className="text-lg font-bold leading-tight hover:text-primary hover:underline"
						>
							{product.name}
						</Link>
						<Button
							variant="ghost"
							size="icon"
							className="size-8 shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
							onClick={() => removeFromCart(product.id)}
							aria-label={`הסר ${product.name}`}
						>
							<XIcon className="size-4" />
						</Button>
					</div>
					<p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
				</div>
				<div className="mt-4 flex flex-wrap items-end justify-between gap-4">
					<div className="flex items-center gap-1 overflow-hidden rounded-md border border-border bg-background shadow-sm">
						<Button
							variant="ghost"
							size="icon"
							className="size-8 rounded-none border-e border-border hover:bg-muted"
							onClick={() => updateQuantity(product.id, quantity - 1)}
							aria-label="הפחת כמות"
							title="הפחתה"
						>
							<MinusIcon className="size-3" />
						</Button>
						<span
							className="min-w-10 select-none text-center text-sm font-bold"
							aria-label={`כמות הפריט: ${quantity}`}
							role="text"
							title="כמות הפריט"
						>
							{quantity}
						</span>
						<Button
							variant="ghost"
							size="icon"
							className="size-8 rounded-none border-s border-border hover:bg-muted"
							onClick={() => updateQuantity(product.id, quantity + 1)}
							aria-label="הוסף כמות"
							title="הוספה"
						>
							<PlusIcon className="size-3" />
						</Button>
					</div>

					<div className="text-end">
						<p className="text-xs text-muted-foreground" aria-hidden="true">
							₪{product.price} ליחידה
						</p>
						<p className="text-xl font-black text-primary">₪{product.price * quantity}</p>
					</div>
				</div>
			</div>
		</li>
	);
}
