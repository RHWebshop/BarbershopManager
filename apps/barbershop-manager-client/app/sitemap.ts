import type { MetadataRoute } from "next";

// TODO: improve SEO, add dynamic product pages, actualize which pages to include, etc.
export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
		{
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.7,
		},
		{
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/store`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.9,
		},

		// Dynamic product pages
		// ...PRODUCTS.map((product) => ({
		// 	url: `${process.env.NEXT_PUBLIC_BASE_URL}/store/${product.id}`,
		// 	lastModified: new Date(),
		// 	changeFrequency: "weekly",
		// 	priority: 0.7,
		// })),
	];
}
