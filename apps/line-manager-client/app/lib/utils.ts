import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// accepts an array, index, and updater function, returns a new array with the item at the index updated using the updater function
export function updateItemAtIndex<T>(array: T[], index: number, updater: (item: T) => T): T[] {
	return [...array.slice(0, index), updater(array[index]), ...array.slice(index + 1)];
}
