import { z } from "zod";

export const signInSchema = z.object({
  phone: z.string().regex(/^05\d{1}-?[0-9]{7}$/, "מספר טלפון לא תקין"),
});

export const signUpSchema = z.object({
  name: z.string().min(2, "שם מלא חייב להכיל לפחות 2 תווים"),
  phone: z.string().regex(/^05\d{1}-?[0-9]{7}$/, "מספר טלפון לא תקין"),
  dob: z.date({
    error: "יש לבחור תאריך לידה",
  }),
  gender: z.string().min(1, "יש לבחור מגדר"),
});

export const verifyOtpSchema = z.object({
  otp: z.string().length(6, "קוד אימות חייב להכיל 6 ספרות"),
});

export type SignInFormValues = z.infer<typeof signInSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;
export type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>;
