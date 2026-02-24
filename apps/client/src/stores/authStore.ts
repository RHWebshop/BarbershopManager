import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type User } from "@line-manager/types";

interface AuthActions {
	login: (user: User) => void;
	logout: () => void;
}
interface AuthState {
	user: User | null;
	isAwaitingOtp: boolean;
	actions: AuthActions;
}

//! flow - user null -> login -> isAwaitingOtp true -> otp verified -> user set, isAwaitingOtp false
const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			isAwaitingOtp: false,
			actions: {
				login: (user) => set({ user, isAwaitingOtp: false }),
				logout: () => set({ user: null, isAwaitingOtp: false }),
			},
		}),
		{
			name: "session",
		},
	),
);

export const useUser = () => useAuthStore((state) => state.user);

export const useIsAwaitingOtp = () => useAuthStore((state) => state.isAwaitingOtp);

export const useAuthActions = () => useAuthStore((state) => state.actions);
