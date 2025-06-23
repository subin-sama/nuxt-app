<template>
  <div
    class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  >
    <div
      v-for="(book, index) in bookList"
      :key="book.id"
      class="rounded-lg border border-gray-200 p-4 shadow-sm"
    >
      <ClientOnly>
        <template #fallback>
          <div class="h-32 bg-gray-200 rounded animate-pulse" />
          <div class="flex items-center gap-2 mt-4">
            <div class="h-10 w-full bg-gray-200 rounded animate-pulse" />
            <div class="h-10 w-12 bg-gray-200 rounded animate-pulse" />
          </div>
        </template>

        <div class="flex w-full items-center justify-between relative">
          <slot name="header">
            <Badge color="primary" class="absolute -top-6 -left-6 z-10">
              {{ index + 1 }}</Badge
            >
            <h2 class="text-lg font-bold truncate">
              {{ book.title }}
            </h2>
            <Badge color="primary">{{ book.genre }}</Badge>
          </slot>
        </div>

        <div class="mt-4">
          <slot name="body">
            <p class="text-sm text-gray-500 flex items-center gap-2">
              <Icon name="lucide:user" class="h-4 w-4" />
              <span class="text-black font-semibold">{{ book.author }}</span>
            </p>
            <p class="text-sm text-gray-500 flex items-center gap-2">
              <Icon name="lucide:book" class="h-4 w-4" />
              Published in
              <span class="text-black font-semibold">{{
                book.published_year
              }}</span>
            </p>
            <p class="text-sm text-gray-500 flex items-center gap-2">
              <Icon name="lucide:calendar" class="h-4 w-4" />
              Created
              <span class="text-black font-semibold">{{
                formatDate(book.created_at)
              }}</span>
            </p>
            <p class="text-sm text-gray-500 flex items-center gap-2">
              <Icon name="lucide:calendar" class="h-4 w-4" />
              Updated
              <span class="text-black font-semibold">{{
                formatDate(book.updated_at)
              }}</span>
            </p>
          </slot>
        </div>

        <div class="mt-4">
          <slot name="footer">
            <div class="flex items-center gap-2">
              <Button
                icon="lucide:edit"
                label="Edit"
                color="primary"
                variant="solid"
                class="w-full text-center"
                @click="props.onEdit(book)"
              />
              <Button
                icon="lucide:trash"
                color="destructive"
                variant="outline"
                class="text-center"
                @click="props.onDelete(book)"
              />
            </div>
          </slot>
        </div>
      </ClientOnly>
    </div>
  </div>

  <div v-if="isLoading" class="flex w-full items-center justify-center p-4">
    <Icon name="lucide:loader-circle" class="h-6 w-6 animate-spin" />
  </div>
  <div v-else-if="bookList.length === 0">
    <p class="text-center text-gray-500">No books found</p>
  </div>
  <div ref="trigger" class="h-10" />
</template>

<script setup lang="ts">
import type { BookSchema } from "~/util/schema/book-schema";
import { formatDate } from "~/util/formatDate";
import { sleep } from "~/util/sleep";
import { sortBooks } from "~/util/sort";

const props = defineProps<{
  books: BookSchema[];
  onEdit: (book: BookSchema) => void;
  onDelete: (book: BookSchema) => void;
}>();

const page = ref<number>(1);
const limit = ref<number>(20);
const trigger = ref<HTMLDivElement | null>(null);
const isLoading = ref<boolean>(true);
const bookList = ref<BookSchema[]>([]);

watch(
  () => props.books,
  (newBooks) => {
    page.value = 1;
    bookList.value = [];
    isLoading.value = false;

    if (newBooks.length > 0) {
      loadInitialBooks();
    }
  },
  { immediate: true, deep: true }
);

function loadInitialBooks() {
  const sortedBooks = sortBooks(props.books);
  const initialBooks = sortedBooks.slice(0, limit.value);
  bookList.value = initialBooks;
  page.value = 2;
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        fetchBooks();
      }
    },
    {
      rootMargin: "0px",
      threshold: 1.0,
    }
  );

  if (trigger.value) {
    observer.observe(trigger.value);
  }
});

async function fetchBooks() {
  if (bookList.value.length >= props.books.length) {
    return;
  }

  isLoading.value = true;
  await sleep(2000);

  const sortedBooks = sortBooks(props.books);
  const startIndex = (page.value - 1) * limit.value;
  const endIndex = page.value * limit.value;
  const books = sortedBooks.slice(startIndex, endIndex);

  if (books.length > 0) {
    bookList.value = [...bookList.value, ...books];
    page.value += 1;
  }

  isLoading.value = false;
}
</script>
