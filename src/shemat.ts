import z from "zod";

export const configZodShemat = z.object({
    code: z.string().trim().min(1, "Code is required"),
    join: z.string().trim().url("Join URL must be a valid URL"),
    article: z.boolean().default(true),
})


// 


export const articlesZodShemat = z.array(z.object({
    id: z.string().trim().regex(/^[a-z0-9_-]+$/, { message: "ID must be a lowercase alphanumeric string with dashes and underscores." }).min(1, "ID is required"), // Unique identifier for the article
    title: z.string().trim().min(1, "Title is required"), // Unique title for the article
    author: z.string().trim().min(1, "Author is required"),
    date: z.string().trim().min(1, "Date is required").transform(date => new Date(date)).refine(date => !isNaN(date.getTime()), {message: "Invalid date format. Please use a valid date string.",}),
    tags: z.array(z.string().trim().regex(/^[^\s]*$/, {message: "Tags must not contain whitespace."}).toLowerCase()).default([]),
    icon: z.string().trim().min(1).optional(),
    content: z.string().trim().min(1, "Content is required"),
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


//

export const textColorZodShemat = z.enum(["dark", "light"]).default("dark");

const pageShemat = z.object({
    color: ztextColorZodShemat,
    background: z.string().trim().default("white"),
    content: z.string().trim().default("empty content here"),
})

export const pagesZodShemat = z.object({
    home: pageShemat,
    about: pageShemat,
    articles: z.object({ 
        sub_title: z.string().trim().default(""),
        ...pageShemat.shape
    }),
    article: pageShemat.omit({ content: true }),
})