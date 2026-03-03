"use client";

import { type ReactNode, createContext, useState, useContext } from "react";
import { useStore } from "zustand";

import { type CartStore, type CartState, createCartStore } from "@/stores/cart-store";

export type CartStoreApi = ReturnType<typeof createCartStore>;

// create a CartStore context and provider to wrap the app with, since we can't use the store directly in the app router with Zustand vanilla. This is a workaround until Zustand adds official support for the app router.
export const CartStoreContext = createContext<CartStoreApi | undefined>(undefined);

export interface CartStoreProviderProps {
	initialState?: CartState;
	children: ReactNode;
}

// Create the store once per app render and provide it to the rest of the app via context.
export const CartStoreProvider = ({ initialState, children }: CartStoreProviderProps) => {
	const [store] = useState(() => createCartStore(initialState));
	return <CartStoreContext.Provider value={store}>{children}</CartStoreContext.Provider>;
};

// Custom hook to use the CartStore in components. This will throw an error if used outside of the CartStoreProvider.
export const useCartStore = <T,>(selector: (store: CartStore) => T): T => {
	const cartStoreContext = useContext(CartStoreContext);
	if (!cartStoreContext) {
		throw new Error(`useCartStore must be used within CartStoreProvider`);
	}

	return useStore(cartStoreContext, selector);
};
