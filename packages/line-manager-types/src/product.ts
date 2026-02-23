export type ProductCategory =
  | "haircut"
  | "color"
  | "styling"
  | "treatment"
  | "product";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  imageUrl: string;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
