"use client";
import { useCartActions } from "@/providers/cart-store-provider";
import { Product } from "@barbershop-manager/types";
import Link from "../ui/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { MinusIcon, PlusIcon, Trash2 } from "lucide-react";

export default function CartItemCard({
	product,
	quantity,
	index,
}: {
	product: Product;
	quantity: number;
	index: number;
}) {
	const { updateQuantity } = useCartActions();
	return (
		<li
			key={product.id}
			className="grid  grid-cols-[100px_1fr] sm:grid-cols-[150px_1fr] h-full w-full gap-4 p-4 transition-colors hover:bg-muted/30 sm:p-6"
		>
			{/* Product image */}
			<Link href={`/store/${product.id}`} className="relative size-37.5 overflow-hidden rounded-lg">
				<Image
					loading={index > 4 ? "eager" : "lazy"}
					src={product.imageUrl}
					width={150}
					height={150}
					className="size-full object-cover"
					alt={"תמונת פריט"}
				/>
			</Link>

			{/* Details */}
			<div className="flex  flex-col justify-between ">
				<div className="space-y-1">
					<div className="flex items-start justify-between gap-4">
						<Link
							href={`/store/${product.id}`}
							className="group text-lg transition duration-300  font-bold leading-tight hover:text-primary"
						>
							{product.name}
							{/* underline effect */}
							<span className="block max-w-0 group-hover:max-w-full transition-[max-width] duration-500 h-0.5 bg-primary"></span>
						</Link>
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
							aria-label={quantity > 1 ? "הפחת כמות" : `הסר ${product.name}`}
							title={quantity > 1 ? "הפחתה" : `הסרה`}
						>
							{quantity > 1 ? <MinusIcon className="size-3" /> : <Trash2 className="size-3 text-destructive " />}
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
