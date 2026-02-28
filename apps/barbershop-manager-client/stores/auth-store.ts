import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type User } from "@barbershop-manager/types";
type AuthActions = {
	login: (user: User) => void;
	logout: () => void;
};
type AuthState = {
	user: User | null;
	isOTP: boolean;
	actions: AuthActions;
};
const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			isOTP: false,
			actions: {
				login: (user) => set({ user, isOTP: true }),
				logout: () => set({ user: null, isOTP: false }),
			},
		}),
		{
			name: "auth-storage",
			// TODO: figure out what this is
			partialize: (state) => ({
				user: state.user,
				isOTP: state.isOTP,
			}),
		}
	)
);
export const useAuthActions = () => useAuthStore((s) => s.actions);
export const useAuthIsOTP = () => useAuthStore((s) => s.isOTP);
export const useAuthUser = () => useAuthStore((s) => s.user);
