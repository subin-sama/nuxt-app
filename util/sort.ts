import type { BookSchema } from "./schema/book-schema";

export function sortBooks(books: BookSchema[]) {
  return [...books].sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
}
