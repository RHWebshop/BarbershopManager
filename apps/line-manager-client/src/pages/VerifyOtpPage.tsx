import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useAuthStore } from "@/features/auth/store";
import { Loader2, ShieldCheckIcon } from "lucide-react";
import { verifyOtpSchema, type VerifyOtpFormValues } from "@line-manager/schemas";

export function VerifyOtpPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const login = useAuthStore((state) => state.login);
  
  const phone = searchParams.get("phone") || "";
  const mode = searchParams.get("mode") || "signin";
  const name = searchParams.get("name") || "משתמש זמני";
  const gender = searchParams.get("gender") || undefined;
  const dob = searchParams.get("dob") || undefined;

  const form = useForm<VerifyOtpFormValues>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: VerifyOtpFormValues) => {
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (data.otp !== "111111") {
      form.setError("otp", { type: "manual", message: "קוד השגיאה שגוי. אנא נסה 111111." });
      return;
    }

    // Success! Log the user in
    login({
      id: Math.random().toString(36).substr(2, 9),
      phone,
      name: mode === "signup" ? name : "משתמש רשום",
      gender,
      dob,
    });

    navigate("/", { replace: true });
  };

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight">אימות קוד</h1>
        <p className="text-lg text-muted-foreground">
          כאן תוכלו להזין את הקוד שקיבלתם ב-SMS כדי לאמת את זהותכם.
        </p>
      </div>

      {false && (
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="w-full max-w-md space-y-8 rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="space-y-4 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShieldCheckIcon className="size-6" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight">אימות מספר טלפון</h1>
              <p className="text-sm text-muted-foreground">
                הקלידו את הקוד בן 6 הספרות שנשלח למספר <br />
                <span className="font-bold text-foreground" dir="ltr">{phone}</span>
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex justify-center" dir="ltr">
                  <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormMessage className="text-center" />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full text-lg font-bold"
                  disabled={form.formState.isSubmitting || form.watch("otp")?.length !== 6}
                >
                  אימות קוד
                  {form.formState.isSubmitting && <Loader2 className="ml-2 size-5 animate-spin" />}
                </Button>
              </form>
            </Form>

            <div className="text-center text-sm text-muted-foreground">
              לא קיבלתם קוד?{" "}
              <Button variant="link" className="p-0 text-primary" onClick={() => form.setValue("otp", "111111")} disabled={form.formState.isSubmitting}>
                שליחה מחדש (הזן 111111)
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
