import { useMutation, useQuery } from "@tanstack/react-query";
import {
    type SignInFormValues,
    type SignUpFormValues,
    type VerifyOtpFormValues
} from "@line-manager/schemas";
import { type User } from "@line-manager/types";
import { apiFetch } from "@/lib/api-client";

export function useSendOtp() {
    return useMutation({
        mutationFn: (data: SignInFormValues | SignUpFormValues) => {
            return apiFetch("/auth/send-otp", {
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
            return apiFetch<VerifyOtpResponse>("/auth/verify-otp", {
                method: "POST",
                body: JSON.stringify(data),
            });
        },
    });
}

export function useMe() {
    return useQuery({
        queryKey: ["me"],
        queryFn: () => apiFetch<User>("/auth/me"),
        retry: false,
        staleTime: Infinity,
    });
}

export function useLogout() {
    return useMutation({
        mutationFn: () => apiFetch<{ success: boolean }>("/auth/logout", { method: "POST" }),
    });
}
