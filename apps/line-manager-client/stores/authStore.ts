import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type User } from "@line-manager/types";
type AuthActions = {
	login: (user: User) => void;
	logout: () => void;
};
type AuthState = {
	user: User | null;
	isOTP: boolean;
	actions: AuthActions;
};

export const useAuthStore = create<AuthState>()(
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
export const useAuthStoreActions = () => useAuthStore((s) => s.actions);
export const useAuthStoreIsOTP = () => useAuthStore((s) => s.isOTP);
export const useAuthStoreUser = () => useAuthStore((s) => s.user);
