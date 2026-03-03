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

//! OLD CART STORE - using zustand vanilla for the App Router safe version.
// const useCartStore = createStore<CartState>((set) => ({
// 	items: [],
// 	actions: {
// 		addToCart: (product) =>
// 			set((state) => {
// 				// check if product already exists in cart, save index if found
// 				const productInCartIndex = state.items.findIndex((item) => item.product.id === product.id);
// 				return productInCartIndex !== -1
// 					? // if found, update quantity of existing product
// 						{
// 							items: state.items.map((item, index) =>
// 								index === productInCartIndex ? { ...item, quantity: item.quantity + 1 } : item
// 							),
// 						}
// 					: // if not found, add new product to cart with quantity 1
// 						{ items: [...state.items, { product, quantity: 1 }] };
// 			}),

// 		removeFromCart: (productId) =>
// 			set((state) => ({
// 				items: state.items.filter((item) => item.product.id !== productId),
// 			})),

// 		updateQuantity: (productId, quantity) =>
// 			set((state) => {
// 				// if quantity is 0 or less, remove item from cart
// 				if (quantity <= 0) {
// 					return {
// 						items: state.items.filter((item) => item.product.id !== productId),
// 					};
// 				}
// 				//  else, update quantity of existing product
// 				return {
// 					items: state.items.map((item) => (item.product.id === productId ? { ...item, quantity } : item)),
// 				};
// 			}),

// 		clearCart: () => set({ items: [] }),
// 	},
// }));
// export const useCartActions = () => useCartStore((state) => state.actions);

// // all products
// export const useCartProducts = () => useCartStore((state) => state.items);

// export const useCartQuantity = () => useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));

// // specific product - return null if not found
// export const useCartProductById = (productId: string) =>
// 	useCartStore((state) => state.items.find((item) => item.product.id === productId)?.product ?? null);

// // total unique products in cart
// export const useCartTotalUniqueProducts = () => useCartStore((state) => state.items.length);

// // total price of all products in cart
// export const useCartPrice = () =>
// 	useCartStore((state) => state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0));

// // quantity of specific product in cart, return 0 if not found
// export const useCartProductQuantity = (productId: string) =>
// 	useCartStore((state) => {
// 		return state.items.find((item) => item.product.id === productId)?.quantity ?? 0;
// 	});
