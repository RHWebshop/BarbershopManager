import { someSchema } from './test/schema.js'
import { productSchema, cartItemSchema, productCategorySchema } from './product.js'
import { signInSchema, signUpSchema, verifyOtpSchema, type SignInFormValues, type SignUpFormValues, type VerifyOtpFormValues } from './auth.js'

export {
    someSchema,
    productSchema,
    cartItemSchema,
    productCategorySchema,
    signInSchema,
    signUpSchema,
    verifyOtpSchema,
};

export type {
    SignInFormValues,
    SignUpFormValues,
    VerifyOtpFormValues,
};