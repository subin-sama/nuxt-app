import z from "zod";
import { years } from "~/constants/years";

export const bookSchema = z.object({
  id: z.string().min(1, "ID is required"),
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  published_year: z.string().min(1, "Published year is required"),
  genre: z.string().min(1, "Genre is required"),
  created_at: z.string().min(1, "Created at is required"),
  updated_at: z.string().min(1, "Updated at is required"),
});

export type BookSchema = z.output<typeof bookSchema>;

export const getInitialState = (): BookSchema => ({
  id: crypto.randomUUID(),
  title: "",
  author: "",
  published_year: years[0].value,
  genre: "",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
});
export const BookState = reactive<BookSchema>(getInitialState());
