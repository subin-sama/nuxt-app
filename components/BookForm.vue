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
                :disabled="isLoading"
              />
            </UFormField>
            <UFormField label="Author" name="author" required>
              <UInput
                v-model="state.author"
                class="w-full"
                placeholder="Enter author name"
                required
                :disabled="isLoading"
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
                :disabled="isLoading"
              />
            </UFormField>
            <UFormField label="Genre" name="genre" required>
              <UInput
                v-model="state.genre"
                class="w-full"
                placeholder="Enter genre"
                required
                :disabled="isLoading"
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
        :disabled="isLoading"
        @click="open = false"
      />
      <UButton
        label="Submit"
        color="primary"
        :disabled="isLoading"
        :loading="isLoading"
        @click="submitForm"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { years } from "~/constants/years";
import { bookSchema, type BookSchema } from "~/util/schema/book-schema";

const state = reactive<Partial<BookSchema>>({
  title: "",
  author: "",
  published_year: years[0].value,
  genre: "",
});

const toast = useToast();
const open = ref(false);
const form = ref();
const isLoading = ref(false);

async function onSubmit(event: FormSubmitEvent<BookSchema>) {
  isLoading.value = true;

  try {
    toast.add({
      title: "Created Success",
      description: `"${event.data.title}" has been added to your collection.`,
      color: "success",
    });
    open.value = false;
  } catch {
    toast.add({
      title: "Failed to add book.",
      description: "Please try again.",
      color: "error",
    });
  } finally {
    isLoading.value = false;
  }
}

function submitForm() {
  form.value?.submit();
}
</script>
