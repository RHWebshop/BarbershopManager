import { PRODUCTS } from "@/data/storeData";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, InfoIcon } from "lucide-react";
import Link from "@/components/ui/link";

import ProductContent from "@/components/product/product-content";
// import { getQueryClient } from "@/lib/query-provider";
// import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
export default async function ProductPage({ params }: { params: Promise<{ productId: string }> }) {
	const { productId } = await params;
	const product = PRODUCTS.find((p) => p.id === productId);

	// TODO: uncomment when we have a real API and react-query setup
	/* 
	const queryClient = getQueryClient();

	await queryClient.prefetchQuery({
		queryKey: [productId, "product"],
		queryFn: () => getProduct(productId),
	});

	if (!product) {
		return <ProductNotFound />;
	}

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ProductContent />
		</HydrationBoundary>
	); */

	if (!product) {
		return <ProductNotFound />;
	}

	return <ProductContent product={product} />;


}

const ProductNotFound = () => {
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
};
