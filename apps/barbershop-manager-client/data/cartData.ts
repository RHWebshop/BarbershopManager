import type { CartItem } from "@barbershop-manager/types";
import { PRODUCTS } from "./storeData";

export const CART_ITEMS: CartItem[] = [
	{
		product: PRODUCTS[0],
		quantity: 1,
	},
	{
		product: PRODUCTS[7],
		quantity: 2,
	},
	{
		product: PRODUCTS[8],
		quantity: 3,
	},
	{
		product: PRODUCTS[6],
		quantity: 1,
	},
	{
		product: PRODUCTS[5],
		quantity: 1,
	},
	{
		product: PRODUCTS[4],
		quantity: 2,
	},
	{
		product: PRODUCTS[3],
		quantity: 1,
	},
	{
		product: PRODUCTS[2],
		quantity: 2,
	},
	{
		product: PRODUCTS[1],
		quantity: 1,
	},
];
