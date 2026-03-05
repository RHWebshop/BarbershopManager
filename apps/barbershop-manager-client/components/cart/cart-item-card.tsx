"use client";
import { useCartActions } from "@/providers/cart-store-provider";
import { Product } from "@barbershop-manager/types";
import Link from "../ui/link";
import { Button } from "../ui/button";
import { MinusIcon, PlusIcon, Trash2 } from "lucide-react";
import Image from "../ui/image";

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
			className="flex flex-col items-center 2xs:grid  2xs:grid-cols-[100px_1fr] sm:grid-cols-[150px_1fr] h-full w-full gap-4 p-2  xs:p-4 transition-colors hover:bg-muted/30 sm:p-6"
		>
			{/* Product image */}
			<Link
				href={`/store/${product.id}`}
				className="relative w-full 2xs:w-auto aspect-square overflow-hidden rounded-lg"
			>
				<Image
					loading={index > 4 ? "eager" : "lazy"}
					src={product.imageUrl}
					fill
					sizes="(min-width: 640px) 150px, (min-width: 480px) 100px, 300px"
					className="object-cover"
					alt={"תמונת פריט"}
				/>
			</Link>

			{/* Details */}
			<div className="h-full flex  flex-col gap-2  ">
				<div className="flex flex-col flex-1">
					<div className="flex items-start">
						<Link
							href={`/store/${product.id}`}
							className="group clamp-lg transition-colors duration-300  font-bold leading-tight hover:text-primary"
						>
							{product.name}
							{/* underline effect */}
							<span className="block max-w-0 group-hover:max-w-full transition-[max-width] duration-500 h-0.5 bg-primary"></span>
						</Link>
					</div>
					<p className=" text-muted-foreground clamp-sm flex-1 line-clamp-3">{product.description}</p>
				</div>

				<div className="flex  items-end justify-between gap-1 sm:gap-4">
					<div className="flex items-center gap-1 overflow-hidden rounded-md border border-border bg-background shadow-sm">
						<Button
							variant="ghost"
							size="icon"
							className="size-8 rounded-none border-e border-border hover:bg-muted"
							onClick={() => updateQuantity(product.id, quantity - 1)}
							aria-label={quantity > 1 ? "הפחת כמות" : `הסר ${product.name}`}
							title={quantity > 1 ? "הפחתה" : `הסרה`}
						>
							{quantity > 1 ? <MinusIcon className="size-3 sm:size-4" /> : <Trash2 className="size-3 sm:size-4" />}
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
							<PlusIcon className="size-3 sm:size-4" />
						</Button>
					</div>

					<div className="text-end">
						<p className="clamp-sm text-muted-foreground " aria-hidden="true">
							₪{product.price}/יחידה
						</p>
						<p className="clamp-lg font-black text-primary">₪{product.price * quantity}</p>
					</div>
				</div>
			</div>
		</li>
	);
}
