<template>
  <Modal
    id="add-book-form"
    :title="formState.title"
    :description="formState.description"
    :open="open"
    @close="closeModal"
  >
    <template #body>
      <UForm
        ref="form"
        :schema="bookSchema"
        :state="BookState"
        @submit="onSubmit"
      >
        <div class="w-full">
          <div class="grid grid-cols-1 gap-x-4 space-y-2 md:grid-cols-2">
            <UFormField label="Title" name="title" required>
              <UInput
                v-model="BookState.title"
                class="w-full"
                placeholder="Enter book title"
                :disabled="bookStore.isLoading"
              />
            </UFormField>
            <UFormField label="Author" name="author" required>
              <UInput
                v-model="BookState.author"
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
                v-model="BookState.published_year"
                :items="years"
                option-attribute="label"
                value-attribute="value"
                class="w-full"
                :disabled="bookStore.isLoading"
              />
            </UFormField>
            <UFormField label="Genre" name="genre" required>
              <UInput
                v-model="BookState.genre"
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
      <div class="mt-4 flex items-center justify-end gap-2">
        <Button
          label="Cancel"
          color="gray"
          variant="outline"
          :disabled="bookStore.isLoading"
          @click="closeModal"
        />
        <Button
          :label="props.formState.isUpdate ? 'Update' : 'Create'"
          color="primary"
          :disabled="bookStore.isLoading"
          :loading="bookStore.isLoading"
          @click="submitForm"
        />
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { years } from "~/constants/years";
import { useBookStore } from "~/store/book";
import {
  BookState,
  bookSchema,
  type BookSchema,
} from "~/util/schema/book-schema";
import type { FormState } from "~/util/types/book";

const props = defineProps<{
  onCreate: (event: FormSubmitEvent<BookSchema>) => void;
  onUpdate: (event: FormSubmitEvent<BookSchema>) => void;
  onClose: () => void;
  open: boolean;
  formState: FormState;
}>();

const form = ref();
const bookStore = useBookStore();

async function onSubmit(event: FormSubmitEvent<BookSchema>) {
  if (props.formState.isUpdate) {
    props.onUpdate(event);
  } else {
    props.onCreate(event);
  }
}

function submitForm() {
  form.value?.submit();
}

function closeModal() {
  props.onClose();
}
</script>
