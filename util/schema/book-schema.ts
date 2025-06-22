import z from "zod";

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  published_year: z.string().min(1, "Published year is required"),
  genre: z.string().min(1, "Genre is required"),
});

export type BookSchema = z.output<typeof bookSchema>;
