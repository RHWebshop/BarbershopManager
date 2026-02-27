// Selector to check if a product exists in the cart

import { create } from "zustand";
import type { Product, CartItem } from "@line-manager/types";

/* 

Item: {
	Product
	Quantity
}
	*/
type CartActions = {
	addToCart: (product: Product) => void;
	removeFromCart: (productId: string) => void;
	updateQuantity: (productId: string, quantity: number) => void;
	clearCart: () => void;
};
interface CartState {
	items: CartItem[];
	actions: CartActions;
}
// TODO: refactor
const useCartStore = create<CartState>((set) => ({
	items: [],
	actions: {
		addToCart: (product) =>
			set((state) => {
				// check if product already exists in cart, save index if found
				const productInCartIndex = state.items.findIndex((item) => item.product.id === product.id);
				return productInCartIndex !== -1
					? // if found, update quantity of existing product
						{
							items: state.items.map((item, index) =>
								index === productInCartIndex ? { ...item, quantity: item.quantity + 1 } : item
							),
						}
					: // if not found, add new product to cart with quantity 1
						{ items: [...state.items, { product, quantity: 1 }] };
			}),

		removeFromCart: (productId) =>
			set((state) => ({
				items: state.items.filter((item) => item.product.id !== productId),
			})),

		updateQuantity: (productId, quantity) =>
			set((state) => {
				// if quantity is 0 or less, remove item from cart
				if (quantity <= 0) {
					return {
						items: state.items.filter((item) => item.product.id !== productId),
					};
				}
				//  else, update quantity of existing product
				return {
					items: state.items.map((item) => (item.product.id === productId ? { ...item, quantity } : item)),
				};
			}),

		clearCart: () => set({ items: [] }),
	},
}));
export const useCartActions = () => useCartStore((state) => state.actions);

// all products
export const useCartProducts = () => useCartStore((state) => state.items);

// specific product - return null if not found
export const useCartProductById = (productId: string) =>
	useCartStore((state) => state.items.find((item) => item.product.id === productId)?.product ?? null);

// total unique products in cart
export const useCartTotalUniqueProducts = () => useCartStore((state) => state.items.length);

// total quantity of all products in cart
export const useCartTotalProducts = () =>
	useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));

// total price of all products in cart
export const useCartTotalPrice = () =>
	useCartStore((state) => state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0));

// quantity of specific product in cart, return 0 if not found
export const useCartItemQuantity = (productId: string) =>
	useCartStore((state) => {
		return state.items.find((item) => item.product.id === productId)?.quantity ?? 0;
	});
