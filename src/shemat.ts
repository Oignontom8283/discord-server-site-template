import z from "zod";

export const configZodShemat = z.object({
    code: z.string().min(1, "Code is required"),
    background: z.string().min(1, "Background is required"), // Video, image, gif, or Hex color
    join: z.string().url("Join URL must be a valid URL"),
    paragraphs: z.object({
        home: z.string().default(""),
    })
})