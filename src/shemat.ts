import z from "zod";

const pageShemat = z.object({
    color: z.enum(["dark", "light"]).default("dark"),
    background: z.string().default("white"),
    content: z.string().default(""),
})

export const configZodShemat = z.object({
    code: z.string().min(1, "Code is required"),
    join: z.string().url("Join URL must be a valid URL"),
    article: z.boolean().default(true),
    pages: z.object({
        home: pageShemat,
        about: pageShemat,
    })
})