<template>
  <div v-if="books.length === 0">
    <p>No books found</p>
  </div>
  <div
    v-for="book in books"
    v-else
    :key="book.id"
    class="rounded-lg border border-gray-200 p-4 shadow-sm"
  >
    <div class="flex w-full items-center justify-between">
      <slot name="header">
        <h2 class="text-lg font-bold">{{ book.title }}</h2>
        <Badge color="primary">{{ book.genre }}</Badge>
      </slot>
    </div>

    <div class="mt-4">
      <slot name="body">
        <Placeholder class="h-32" />
        <p class="text-sm text-gray-500 flex items-center gap-2">
          <Icon name="lucide:user" class="h-4 w-4" />
          {{ book.author }}
        </p>
        <p class="text-sm text-gray-500 flex items-center gap-2">
          <Icon name="lucide:book" class="h-4 w-4" />
          Published in {{ book.published_year }}
        </p>
        <p class="text-sm text-gray-500 flex items-center gap-2">
          <Icon name="lucide:calendar" class="h-4 w-4" />
          {{ formatDate(book.created_at) }}
        </p>
        <p class="text-sm text-gray-500 flex items-center gap-2">
          <Icon name="lucide:calendar" class="h-4 w-4" />
          {{ formatDate(book.updated_at) }}
        </p>
      </slot>
    </div>

    <div class="mt-4">
      <slot name="footer">
        <Placeholder class="h-8" />
        <div class="flex items-center gap-2">
          <Button
            icon="lucide:edit"
            label="Edit"
            color="primary"
            variant="solid"
            class="w-full text-center"
            @click="onEdit(book)"
          />
          <Button
            icon="lucide:trash"
            color="destructive"
            variant="outline"
            class="text-center"
            @click="onDelete(book)"
          />
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BookSchema } from "~/util/schema/book-schema";
import { formatDate } from "~/util/formatDate";

defineProps<{
  books: BookSchema[];
  onEdit: (book: BookSchema) => void;
  onDelete: (book: BookSchema) => void;
}>();
</script>
