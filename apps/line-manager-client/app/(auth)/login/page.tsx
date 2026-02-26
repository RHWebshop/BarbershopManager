import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, SmartphoneIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { signInSchema, type SignInFormValues } from "@line-manager/schemas";
import { useSendOtp } from "@/features/auth/api";

export function SignInPage() {
	const router = useRouter();

	const { mutateAsync: sendOtp } = useSendOtp();
	const form = useForm<SignInFormValues>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			phone: "",
		},
	});

	const onSubmit = async (data: SignInFormValues) => {
		try {
			await sendOtp(data);
			router.push(
				`/verify-otp?phone=${encodeURIComponent(data.phone)}&mode=signin`,
			);
		} catch (error: any) {
			form.setError("phone", { message: error.message || "שגיאה בשליחת הקוד" });
		}
	};

	return (
		<div className="flex min-h-[60vh] items-center justify-center">
			<div className="w-full max-w-md space-y-8 rounded-2xl border border-border bg-card p-8 shadow-sm">
				<div className="space-y-2 text-center">
					<h1 className="text-3xl font-extrabold tracking-tight">
						ברוכים הבאים
					</h1>
					<p className="text-muted-foreground">
						הזינו מספר טלפון כדי להתחבר או להירשם
					</p>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>מספר טלפון</FormLabel>
									<FormControl>
										<div className="relative">
											<Input
												type="tel"
												placeholder="05X-XXXXXXX"
												className="pl-10 text-right"
												dir="rtl"
												{...field}
											/>
											<SmartphoneIcon className="absolute left-3 top-2.5 size-5 text-muted-foreground" />
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							className="w-full text-lg font-bold"
							disabled={form.formState.isSubmitting}>
							המשך
							{form.formState.isSubmitting && (
								<Loader2 className="ml-2 size-5 animate-spin" />
							)}
						</Button>
					</form>
				</Form>

				<div className="text-center text-sm text-muted-foreground">
					עוד אין לך חשבון?{" "}
					<Button
						variant="link"
						className="p-0 text-primary"
						onClick={() => router.push("/sign-up")}
						disabled={form.formState.isSubmitting}>
						להרשמה
					</Button>
				</div>
			</div>
		</div>
	);
}
