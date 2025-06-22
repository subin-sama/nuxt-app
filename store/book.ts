import type { BookSchema } from "~/util/schema/book-schema";

export const useBookStore = defineStore("book", () => {
  const books = ref<BookSchema[]>([]);
  const isLoading = ref(false);

  function addBook(book: BookSchema) {
    books.value.push(book);
  }

  return {
    books,
    isLoading,
    addBook,
  };
});
