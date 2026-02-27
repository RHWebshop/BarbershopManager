import { useCartStore, selectTotalCount, selectTotalPrice } from "@/features/cart/store";
import { Button } from "@/components/ui/button";
import {
	MinusIcon,
	PlusIcon,
	ShoppingCartIcon,
	Trash2Icon,
	XIcon,
	TruckIcon,
	ShieldCheckIcon,
	CreditCardIcon,
	ArrowLeftIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Cart() {
	const items = useCartStore((s) => s.items);
	const updateQuantity = useCartStore((s) => s.updateQuantity);
	const removeFromCart = useCartStore((s) => s.removeFromCart);
	const clearCart = useCartStore((s) => s.clearCart);
	const totalCount = useCartStore(selectTotalCount);
	const totalPrice = useCartStore(selectTotalPrice);

	if (items.length === 0) {
		return (
			<div className="space-y-4 py-16 text-center">
				<ShoppingCartIcon className="mx-auto size-12 text-muted-foreground" />
				<h1 className="text-2xl font-bold">העגלה ריקה</h1>
				<p className="text-muted-foreground">הוסיפו מוצרים מהחנות כדי לראותם כאן</p>
				<Button asChild>
					<Link href="/store">לחנות</Link>
				</Button>
			</div>
		);
	}

	return (
		<div className="space-y-10">
			<div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
				<div className="space-y-2">
					<h1 className="text-4xl font-extrabold tracking-tight leading-none">עגלת קניות</h1>
					<p className="text-lg text-muted-foreground">יש לך {totalCount} פריטים בסל הקניות</p>
				</div>
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

			<div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
				{/* Left Column: Items */}
				<div className="space-y-4">
					<div className="divide-y divide-border rounded-xl border border-border bg-card shadow-sm">
						{items.map(({ product, quantity }) => (
							<div key={product.id} className="flex gap-4 p-4 transition-colors hover:bg-muted/30 sm:p-6">
								{/* Product image */}
								<Link
									href={`/store/${product.id}`}
									className="relative size-24 shrink-0 overflow-hidden rounded-lg border border-border bg-muted sm:size-32"
								>
									<Image src={product.imageUrl} alt={product.name} className="size-full object-cover" loading="lazy" />
								</Link>

								{/* Details */}
								<div className="flex flex-1 flex-col justify-between py-1">
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
										<p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
									</div>

									<div className="mt-4 flex flex-wrap items-end justify-between gap-4">
										<div className="flex items-center gap-1 overflow-hidden rounded-md border border-border bg-background shadow-sm">
											<Button
												variant="ghost"
												size="icon"
												className="size-8 rounded-none border-e border-border hover:bg-muted"
												onClick={() => updateQuantity(product.id, quantity - 1)}
												aria-label="הפחת כמות"
											>
												<MinusIcon className="size-3" />
											</Button>
											<span className="min-w-10 text-center text-sm font-bold">{quantity}</span>
											<Button
												variant="ghost"
												size="icon"
												className="size-8 rounded-none border-s border-border hover:bg-muted"
												onClick={() => updateQuantity(product.id, quantity + 1)}
												aria-label="הוסף כמות"
											>
												<PlusIcon className="size-3" />
											</Button>
										</div>

										<div className="text-end">
											<p className="text-xs text-muted-foreground">₪{product.price} ליחידה</p>
											<p className="text-xl font-black text-primary">₪{product.price * quantity}</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					<Button variant="outline" asChild className="gap-2">
						<Link href="/store">
							<ArrowLeftIcon className="size-4" />
							המשך בקניות
						</Link>
					</Button>
				</div>

				{/* Right Column: Summary & Policies */}
				<div className="space-y-6">
					<div className="sticky top-24 space-y-6">
						{/* Summary Card */}
						<div className="rounded-xl border border-border bg-card p-6 shadow-sm">
							<h2 className="text-xl font-bold">סיכום הזמנה</h2>

							<div className="mt-6 space-y-4">
								<div className="flex justify-between text-sm">
									<span className="text-muted-foreground">סיכום ביניים ({totalCount} פריטים)</span>
									<span>₪{totalPrice}</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-muted-foreground">משלוח</span>
									<span className="font-medium text-green-600">חינם!</span>
								</div>

								<div className="border-t border-dashed border-border pt-4">
									<div className="flex justify-between text-xl font-black">
										<span>סה&quot;כ לתשלום</span>
										<span className="text-primary">₪{totalPrice}</span>
									</div>
									<p className="mt-1 text-xs text-muted-foreground">המחיר כולל מע&quot;מ</p>
								</div>

								<Button className="h-12 w-full text-lg font-bold shadow-lg shadow-primary/20" size="lg">
									מעבר לתשלום
								</Button>
							</div>

							<div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6">
								<div className="flex flex-col items-center gap-1 text-center">
									<div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
										<TruckIcon className="size-4" />
									</div>
									<span className="text-[10px] font-bold leading-tight">משלוח מהיר</span>
								</div>
								<div className="flex flex-col items-center gap-1 text-center">
									<div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
										<ShieldCheckIcon className="size-4" />
									</div>
									<span className="text-[10px] font-bold leading-tight">אחריות מלאה</span>
								</div>
								<div className="flex flex-col items-center gap-1 text-center">
									<div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
										<CreditCardIcon className="size-4" />
									</div>
									<span className="text-[10px] font-bold leading-tight">תשלום מאובטח</span>
								</div>
							</div>
						</div>

						{/* Policies Block */}
						<div className="rounded-xl border border-border bg-muted/30 p-6">
							<h3 className="flex items-center gap-2 font-bold">
								<TruckIcon className="size-4" />
								מדיניות משלוחים
							</h3>
							<ul className="mt-4 space-y-3 text-sm text-muted-foreground">
								<li className="flex gap-2">
									<span className="size-1.5 shrink-0 rounded-full bg-primary mt-1.5" />
									<span>
										<strong>משלוח חינם</strong> לכל חלקי הארץ ברכישה מעל ₪199.
									</span>
								</li>
								<li className="flex gap-2">
									<span className="size-1.5 shrink-0 rounded-full bg-primary mt-1.5" />
									<span>אספקה תוך 3-5 ימי עסקים לרוב חלקי הארץ.</span>
								</li>
								<li className="flex gap-2">
									<span className="size-1.5 shrink-0 rounded-full bg-primary mt-1.5" />
									<span>ניתן להחזיר מוצרים תוך 14 יום באריזתם המקורית.</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
