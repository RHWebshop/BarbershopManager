import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "./RootLayout";
import { HomePage } from "@/pages/HomePage";
import { StorePage } from "@/pages/StorePage";
import { ProductPage } from "@/pages/ProductPage";
import { CartPage } from "@/pages/CartPage";
import { LinePage } from "@/pages/LinePage";
import { ContactPage } from "@/pages/ContactPage";
import { SignInPage } from "@/pages/SignInPage";
import { SignUpPage } from "@/pages/SignUpPage";
import { VerifyOtpPage } from "@/pages/VerifyOtpPage";
import { AccessibilityPage } from "@/pages/AccessibilityPage";
import { PrivacyPage } from "@/pages/PrivacyPage";
import { StorePolicyPage } from "@/pages/StorePolicyPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "store", element: <StorePage /> },
      { path: "store/:id", element: <ProductPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "line", element: <LinePage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "sign-in", element: <SignInPage /> },
      { path: "sign-up", element: <SignUpPage /> },
      { path: "verify-otp", element: <VerifyOtpPage /> },
      { path: "accessibility", element: <AccessibilityPage /> },
      { path: "privacy", element: <PrivacyPage /> },
      { path: "store-policy", element: <StorePolicyPage /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
