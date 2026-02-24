import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import { CalendarIcon, Loader2, SmartphoneIcon, UserIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

import { signUpSchema, type SignUpFormValues } from "@line-manager/schemas";

export function SignUpPage() {
  const navigate = useNavigate();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      phone: "",
      gender: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const params = new URLSearchParams({
      mode: "signup",
      name: data.name,
      phone: data.phone,
      dob: data.dob.toISOString().slice(0, 10),
      gender: data.gender,
    });
    
    navigate(`/verify-otp?${params.toString()}`);
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center py-10">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">הרשמה חדשה</h1>
          <p className="text-muted-foreground">הזינו את הפרטים שלכם כדי להתחיל</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>שם מלא</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-2 size-5 text-muted-foreground" />
                      <Input placeholder="ישראל ישראלי" className="pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
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
                      <SmartphoneIcon className="absolute left-3 top-2 size-5 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* DOB */}
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>תאריך לידה</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pr-3 text-right font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: he })
                          ) : (
                            <span>בחרו תאריך</span>
                          )}
                          <CalendarIcon className="mr-auto size-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        captionLayout="dropdown"
                        startMonth={new Date(1900, 0)}
                        endMonth={new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>מגדר</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full text-right" dir="rtl">
                        <SelectValue placeholder="בחרו מגדר" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent dir="rtl">
                      <SelectItem value="male">זכר</SelectItem>
                      <SelectItem value="female">נקבה</SelectItem>
                      <SelectItem value="other">אחר</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full text-lg font-bold mt-2" disabled={form.formState.isSubmitting}>
              המשך לאימות
              {form.formState.isSubmitting && <Loader2 className="ml-2 size-5 animate-spin" />}
            </Button>
          </form>
        </Form>
        
        <div className="text-center text-sm text-muted-foreground">
          כבר יש לך חשבון?{" "}
          <Button variant="link" className="p-0 text-primary" onClick={() => navigate("/sign-in")} disabled={form.formState.isSubmitting}>
            להתחברות
          </Button>
        </div>
      </div>
    </div>
  );
}
