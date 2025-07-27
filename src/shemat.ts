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


// 


export const articlesZodShemat = z.array(z.object({
    id: z.string().min(1, "ID is required"), // Unique identifier for the article
    title: z.string().min(1, "Title is required"), // Unique title for the article
    author: z.string().min(1, "Author is required"),
    date: z.string().min(1, "Date is required"),
    tags: z.array(z.string()).default([]),
    icon: z.string().min(1).optional(),
    content: z.string().min(1, "Content is required"),
}))
.refine(
    (articles) => {
        const ids = articles.map(article => article.id.toLowerCase().trim());
        const titles = articles.map(article => article.title.toLowerCase().trim());
        return new Set(ids).size === ids.length && new Set(titles).size === titles.length;
    },
    {
        message: "Article titles and IDs must be unique.",
    }
);