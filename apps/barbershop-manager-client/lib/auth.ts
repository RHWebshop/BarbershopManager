import { useMutation, useQuery } from "@tanstack/react-query";
import { type SignInFormValues, type SignUpFormValues, type VerifyOtpFormValues } from "@barbershop-manager/schemas";
import { type User } from "@barbershop-manager/types";
import API from "./api";

export function useSendOtp() {
	return useMutation({
		mutationFn: (data: SignInFormValues | SignUpFormValues) => {
			return API("/auth/send-otp", {
				method: "POST",
				body: JSON.stringify(data),
			});
		},
	});
}

interface VerifyOtpResponse {
	success: boolean;
	user: User;
}

export function useVerifyOtp() {
	return useMutation({
		mutationFn: (data: VerifyOtpFormValues & { phone: string } & Partial<SignUpFormValues>) => {
			return API<VerifyOtpResponse>("/auth/verify-otp", {
				method: "POST",
				body: JSON.stringify(data),
			});
		},
	});
}

export function useMe() {
	return useQuery({
		queryKey: ["me"],
		queryFn: () => API<User>("/auth/me"),
		retry: false,
		staleTime: Infinity,
	});
}

export function useLogout() {
	return useMutation({
		mutationFn: () => API<{ success: boolean }>("/auth/logout", { method: "POST" }),
	});
}
