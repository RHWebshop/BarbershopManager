import z from 'zod'

export const productCategorySchema = z.enum([
  "haircut",
  "color",
  "styling",
  "treatment",
  "product",
]);

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number().nonnegative(),
  category: productCategorySchema,
  imageUrl: z.string().url(),
});

export const cartItemSchema = z.object({
  product: productSchema,
  quantity: z.number().int().positive(),
});
