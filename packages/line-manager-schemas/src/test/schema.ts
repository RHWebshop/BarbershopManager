import z from 'zod'

export const someSchema = z.object({
    hello: z.string().refine(s => s === "Hello", { message: "Invalid `Hello` string." })
})