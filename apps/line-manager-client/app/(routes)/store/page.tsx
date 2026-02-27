import { useState, useMemo } from "react";
import Link from "next/link";
import type { ProductCategory } from "@line-manager/types";
import { PRODUCTS, CATEGORY_LABELS } from "@/data/storeData";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { AspectRatio } from "@/components/ui";
import Image from "next/image";

const CATEGORIES: Array<ProductCategory | "all"> = ["all", "haircut", "color", "styling", "treatment", "product"];

export function StorePage() {
	const [search, setSearch] = useState("");
	const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");

	const filtered = useMemo(() => {
		return PRODUCTS.filter((p) => {
			const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
			const matchesCategory = activeCategory === "all" || p.category === activeCategory;
			return matchesSearch && matchesCategory;
		});
	}, [search, activeCategory]);

	return (
		<div className="space-y-10">
			<div className="space-y-2">
				<h1 className="text-4xl font-extrabold tracking-tight">חנות</h1>
				<p className="text-lg text-muted-foreground">גלו את השירותים והמוצרים שלנו</p>
			</div>

			{/* Search bar */}
			<div className="relative">
				<SearchIcon
					className="pointer-events-none absolute inset-s-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
					aria-hidden
				/>
				<input
					type="search"
					placeholder="חיפוש מוצרים..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className={cn(
						"w-full rounded-md border border-input bg-background py-2 ps-10 pe-4 text-sm",
						"placeholder:text-muted-foreground",
						"focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring"
					)}
					aria-label="חיפוש מוצרים"
				/>
			</div>

			{/* Category filters */}
			<div className="flex flex-wrap gap-2" role="tablist" aria-label="סינון לפי קטגוריה">
				{CATEGORIES.map((cat) => (
					<Button
						key={cat}
						variant={activeCategory === cat ? "default" : "outline"}
						size="sm"
						role="tab"
						aria-selected={activeCategory === cat}
						onClick={() => setActiveCategory(cat)}
					>
						{CATEGORY_LABELS[cat]}
					</Button>
				))}
			</div>

			{/* Product grid */}
			{filtered.length === 0 ? (
				<div className="py-12 text-center text-muted-foreground">
					<p className="text-lg font-medium">לא נמצאו מוצרים</p>
					<p className="mt-1 text-sm">נסו לשנות את החיפוש או הקטגוריה</p>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{filtered.map((product) => (
						<Link
							key={product.id}
							href={`/store/${product.id}`}
							className={cn(
								"group overflow-hidden rounded-lg border border-border bg-card transition-shadow",
								"hover:shadow-md focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring"
							)}
						>
							<AspectRatio ratio={4 / 3} className="overflow-hidden bg-muted">
								<Image src={product.imageUrl} alt={product.name} className="size-full object-contain" loading="lazy" />
							</AspectRatio>
							<div className="space-y-1 p-4">
								<div className="flex items-start justify-between gap-2">
									<h2 className="font-semibold leading-tight">{product.name}</h2>
									<span className="shrink-0 font-bold text-primary">₪{product.price}</span>
								</div>
								<span className="inline-block rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
									{CATEGORY_LABELS[product.category]}
								</span>
							</div>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}
