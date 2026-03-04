// Selector to check if a product exists in the cart

import { createStore } from "zustand/vanilla";
import type { Product, CartItem } from "@barbershop-manager/types";

export type CartState = {
	items: CartItem[];
};
export type CartActions = {
	actions: {
		addToCart: (product: Product) => void;
		removeFromCart: (productId: string) => void;
		updateQuantity: (productId: string, quantity: number) => void;
		clearCart: () => void;
	};
};

export type CartStore = CartState & CartActions;

export const defaultInitState: CartState = {
	items: [],
};

export const createCartStore = (initState: CartState = defaultInitState) => {
	return createStore<CartStore>((set) => ({
		...initState,
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
};
