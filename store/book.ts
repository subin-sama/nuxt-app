import type { BookSchema } from "~/util/schema/book-schema";

export const useBookStore = defineStore("book", () => {
  const books = ref<BookSchema[]>([]);
  const isLoading = ref(false);

  function addBook(book: BookSchema) {
    books.value.push(book);
  }

  function updateBook(book: BookSchema) {
    const findBook = books.value.findIndex((b) => b.id === book.id);

    if (findBook !== -1) {
      books.value[findBook] = {
        ...books.value[findBook],
        ...book,
        updated_at: new Date().toISOString(),
      };
    }
  }

  function deleteBook(book: BookSchema) {
    books.value = books.value.filter((b) => b.id !== book.id);
  }

  function getBook(id: string) {
    return books.value.find((b) => b.id === id);
  }

  return {
    books,
    isLoading,
    addBook,
    updateBook,
    deleteBook,
    getBook,
  };
});
