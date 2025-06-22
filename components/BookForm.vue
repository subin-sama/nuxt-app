<template>
  <UButton
    icon="i-lucide-plus"
    size="md"
    color="primary"
    variant="solid"
    @click="open = true"
    >Add Book</UButton
  >
  <UModal
    id="add-book-form"
    v-model:open="open"
    title="Add Book"
    description="Fill in the details to add a new book to your collection."
    :ui="{ footer: 'justify-end' }"
  >
    <template #body>
      <UForm ref="form" :schema="bookSchema" :state="state" @submit="onSubmit">
        <div class="w-full">
          <div class="grid grid-cols-1 gap-x-4 space-y-2 md:grid-cols-2">
            <UFormField label="Title" name="title" required>
              <UInput
                v-model="state.title"
                class="w-full"
                placeholder="Enter book title"
                :disabled="bookStore.isLoading"
              />
            </UFormField>
            <UFormField label="Author" name="author" required>
              <UInput
                v-model="state.author"
                class="w-full"
                placeholder="Enter author name"
                required
                :disabled="bookStore.isLoading"
              />
            </UFormField>
            <UFormField
              label="Published Year"
              name="published_year"
              class="w-full"
              required
            >
              <USelect
                v-model="state.published_year"
                :items="years"
                option-attribute="label"
                value-attribute="value"
                class="w-full"
                :disabled="bookStore.isLoading"
              />
            </UFormField>
            <UFormField label="Genre" name="genre" required>
              <UInput
                v-model="state.genre"
                class="w-full"
                placeholder="Enter genre"
                required
                :disabled="bookStore.isLoading"
              />
            </UFormField>
          </div>
        </div>
      </UForm>
    </template>

    <template #footer>
      <UButton
        label="Cancel"
        color="neutral"
        variant="outline"
        :disabled="bookStore.isLoading"
        @click="open = false"
      />
      <UButton
        label="Submit"
        color="primary"
        :disabled="bookStore.isLoading"
        :loading="bookStore.isLoading"
        @click="submitForm"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { years } from "~/constants/years";
import { useBookStore } from "~/store/book";
import { bookSchema, type BookSchema } from "~/util/schema/book-schema";

const state = reactive<BookSchema>({
  id: crypto.randomUUID(),
  title: "",
  author: "",
  published_year: years[0].value,
  genre: "",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
});

const toast = useToast();
const open = ref(false);
const form = ref();
const bookStore = useBookStore();

async function onSubmit(event: FormSubmitEvent<BookSchema>) {
  try {
    toast.add({
      title: "Created Success",
      description: `"${event.data.title}" has been added to your collection.`,
      color: "success",
    });
    bookStore.addBook(event.data);
  } catch {
    toast.add({
      title: "Failed to add book.",
      description: "Please try again.",
      color: "error",
    });
  } finally {
    bookStore.isLoading = false;
    open.value = false;
    state.title = "";
    state.author = "";
    state.published_year = years[0].value;
    state.genre = "";
  }
}

function submitForm() {
  form.value?.submit();
}
</script>
