<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
  >
    <div class="absolute inset-0 bg-black/50" />
    <div class="relative rounded-lg bg-white p-4 shadow-lg">
      <div class="flex items-center justify-between gap-4">
        <slot name="header">
          <div class="flex flex-col gap-2 mb-4">
            <h2 class="text-2xl font-bold">{{ title }}</h2>
            <p class="text-gray-600">{{ description }}</p>
          </div>
        </slot>
      </div>
      <slot name="body">
        <div class="mt-4">
          <slot />
        </div>
      </slot>
      <slot name="footer">
        <slot />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  open: boolean;
  onClose: () => void;
}>();
</script>
