<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <Icon name="lucide:library" class="h-8 w-8 text-blue-600" />
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Book Management</h1>
              <p class="text-gray-600">Manage your book collection</p>
            </div>
          </div>
          <BookForm title="Add Book" />
        </div>
      </div>
      <div
        class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <BookCard :books="bookStore.books" @delete="onDelete" @edit="onEdit" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBookStore } from "~/store/book";
import type { BookSchema } from "~/util/schema/book-schema";

const bookStore = useBookStore();

function onDelete(book: BookSchema) {
  bookStore.books = bookStore.books.filter((b) => b.title !== book.title);
}

function onEdit(book: BookSchema) {
  bookStore.books = bookStore.books.map((b) => {
    if (b.title === book.title) {
      return book;
    }
    return b;
  });
}
</script>
