<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <div
          class="flex flex-col items-center justify-between gap-4 md:flex-row"
        >
          <div class="flex items-center gap-3">
            <Icon name="lucide:library" class="h-8 w-8 text-blue-600" />
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Book Management</h1>
              <p class="text-gray-600">Manage your book collection</p>
            </div>
          </div>
          <div class="flex self-end md:self-center gap-2">
            <Button
              icon="i-lucide-plus"
              size="md"
              color="primary"
              label="Add Book"
              variant="solid"
              @click="openModal"
            />
          </div>
        </div>
      </div>

      <div
        class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <BookCard :books="bookStore.books" @delete="onDelete" @edit="onEdit" />
      </div>

      <BookForm
        :form-state="formState"
        :open="open"
        @create="onCreate"
        @update="onUpdate"
        @close="closeModal"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { useBookStore } from "~/store/book";
import {
  BookState,
  getInitialState,
  type BookSchema,
} from "~/util/schema/book-schema";
import type { FormState } from "~/util/types/book";

const bookStore = useBookStore();
const toast = useToast();
const open = ref(false);
const formState = ref<FormState>({
  title: "Add Book",
  description: "Fill in the details to add a new book to your collection.",
  isUpdate: false,
});

function onDelete(book: BookSchema) {
  bookStore.deleteBook(book);
}

function onEdit(book: BookSchema) {
  formState.value.isUpdate = true;
  formState.value.title = "Edit Book";
  formState.value.description = "Fill in the details to edit the book.";

  Object.assign(BookState, book);

  open.value = true;
}

function onUpdate(event: FormSubmitEvent<BookSchema>) {
  const book = event.data;

  toast.add({
    title: "Updated Success",
    description: `"${book.title}" has been updated.`,
    color: "success",
  });

  bookStore.updateBook(book);
  closeModal();
}

function onCreate(event: FormSubmitEvent<BookSchema>) {
  try {
    const bookData = {
      ...event.data,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    bookStore.addBook(bookData);

    toast.add({
      title: "Created Success",
      description: `"${bookData.title}" has been added to your collection.`,
      color: "success",
    });
  } catch {
    toast.add({
      title: "Failed to add book.",
      description: "Please try again.",
      color: "error",
    });
  } finally {
    bookStore.isLoading = false;
    closeModal();
    Object.assign(BookState, getInitialState());
  }
}

function openModal() {
  open.value = true;
}

function closeModal() {
  open.value = false;
  formState.value.isUpdate = false;
  formState.value.title = "Add Book";
  formState.value.description =
    "Fill in the details to add a new book to your collection.";
  Object.assign(BookState, getInitialState());
}
</script>
